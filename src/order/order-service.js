export async function getOrders(db, _) {
  try {
    let p = _.page || 1
    let l = _.limit || 10

    return await db.query(
      `
    SELECT 
      *,
      TO_CHAR(added_time,'YYYY-MM-DD') added_time
    FROM orders o
    WHERE
      CASE
        WHEN $3 > 0 THEN o.user_id = $3
        else true
      END AND
      CASE
        WHEN $5 > 0 THEN o.product_id = $5
        ELSE true
      END AND
      CASE
        WHEN $6 IN (true, false) THEN o.is_paid = $6
        ELSE true
      END AND
      CASE
        WHEN $7::timestamptz > '01-01-2000'::timestamptz THEN TO_CHAR(added_time,'YYYY-MM-DD') = TO_CHAR($7,'YYYY-MM-DD') 
        ELSE true
      END

      ORDER BY
        CASE
          WHEN $4 = 'desc' THEN count 
        END desc,
        CASE 
          WHEN $4 = 'asc' THEN count 
        END asc

      OFFSET $1
      LIMIT $2
    `,
      [(p - 1) * l, l, _.userId, _.count, _.productId, _.byPaid, _.byAddedTime]
    )
  } catch (error) {
    throw { error: error.message }
  }
}

export async function addOrder(db, userId, productId) {
  try {
    return await db.query(
      `
    INSERT INTO orders(user_id, product_id) 
    VALUES ($1, $2)
    RETURNING *
    `,
      [userId, productId]
    )
  } catch (error) {
    throw { error }
  }
}

export async function editOrder(db, count, userId, productId) {
  try {
    return await db.query(
      `
    UPDATE orders o SET count =
      CASE
        WHEN $1 > 0 THEN o.count + 1
        ELSE o.count
      END,
      changed_time = NOW()
    WHERE 
      o.user_id = $2 AND
      o.product_id = $3
    RETURNING count
    `,
      [count, userId, productId]
    )
  } catch (error) {
    throw { error }
  }
}

export async function buyAll(db, userId) {
  try {
    return await db.query(
      `
    UPDATE orders o SET is_paid = true,
      changed_time = NOW()
    WHERE 
      o.user_id = $2 AND
      o.is_paid = false
    RETURNING is_paid, changed_time
    `,
      [userId]
    )
  } catch (error) {
    throw { error }
  }
}

export async function removeOrder(db, orderId) {
  try {
    return await db.query(
      `
    DELETE FROM orders o 
    WHERE 
      o.id = $1
    RETURNING id
    `,
      [orderId]
    )
  } catch (error) {
    throw { error }
  }
}

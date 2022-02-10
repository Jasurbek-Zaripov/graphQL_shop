export async function getProducts(db, _) {
  try {
    let p = _.page || 1
    let l = _.limit || 10

    return await db.query(
      `
    select 
      p.*,
      TRIM(to_char(p.price,'999 999 999 999')) price,
      to_char(p.added_time,'yyyy-mm-dd') added_time,
      c.id category_id,
      c.name category_name,
      sc.id sap_category_id,
      sc.name sap_category_name
    from products p
    left join sap_categories sc on p.sap_category_id = sc.id
    left join categories c on c.id = sc.parent_category_id
      where
        case
          when length($3) > 0 then p.name ILIKE concat('%',$3,'%')
          else true
        end and
        case
          when $4 > 0 then p.id = $4
          else true
        end and
        case
          when $5 > 0 then sc.id = $5
          else true
        end and
        case
          when $7::timestamptz > '01-01-2000'::timestamptz then to_char(p.added_time,'YYYY-MM-DD') = to_char($7,'YYYY-MM-DD') 
          else true
        end

      order by
        case
          when $6 = 'desc' then p.price 
        end desc,
        case 
          when $6 = 'asc' then p.price 
        end asc
    offset $1
    limit $2
    `,
      [(p - 1) * l, l, _.search, _.productId, _.sapCategoryId, _.price, _.addedTime]
    )
  } catch (error) {
    throw { error: error.message }
  }
}

export async function addProduct(db, _) {
  try {
    return await db.query(
      `
      INSERT INTO products (name, sap_category_id, price, short_desc, long_desc, img_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [_.name, _.sapCategoryId, _.price, _.shortDesc, _.LongDesc, _.imgUrl]
    )
  } catch (error) {
    throw { error }
  }
}

export async function editProduct(db, _) {
  try {
    return await db.query(
      `
      UPDATE products p SET name =
        CASE
          WHEN length($1) > 0 THEN $1
          ELSE p.name
        END,
        price =
        CASE
          WHEN $2 > 0 THEN $2
          ELSE p.price
        END,
        short_desc = 
        CASE
          WHEN length($3) > 0 THEN $3
          ELSE p.short_desc
        END, 
        long_desc =
        CASE
          WHEN length($4) > 0 THEN $4
          ELSE p.long_desc
        END,
        img_url = 
        CASE
          WHEN length($5) > 0 THEN $5
          ELSE p.img_url
        END
        
      RETURNING *
    `,
      [_.name, _.price, _.shortDesc, _.LongDesc, _.imgUrl]
    )
  } catch (error) {
    throw { error }
  }
}

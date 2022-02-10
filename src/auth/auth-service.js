export async function forLogin(db, _) {
  try {
    return await db.query(`
    select 
      id,
      role
    from persons p
    where
      email = $1 and
      crypt($2,password) = password
    `)
  } catch (error) {
    throw { error: error.message }
  }
}

export async function forRegister(db, _) {
  try {
    return await db.query(
      `
    INSERT INTO persons(username,password,contact,email)
    VALUES ($1, crypt($2, gen_salt('bf')), $3, $4)
    RETURNING id, role
    `,
      [_.username, _.password, _.contact, _.email]
    )
  } catch (error) {
    throw { error: error.message }
  }
}

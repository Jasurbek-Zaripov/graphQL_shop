export async function getCategory(db) {
  try {
    return await db.query(`
    select 
      c.name category_name,
      c.id category_id,
      sc.id sap_category_id,
      sc.name sap_category_name
    from categories c
    left join sap_categories sc on 
      c.id = sc.parent_category_id
    `)
  } catch (error) {
    throw { error: error.message }
  }
}

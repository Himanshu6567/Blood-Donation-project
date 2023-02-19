import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "8683",
    database: "donation_db",
  })
  .promise();

export async function authenticate(mail) {
  const [pass] = await pool.query(
    "SELECT password from users where email = ?",
    [mail]
  );
  return pass[0].password;
}

export async function userData(mail) {
  const [data] = await pool.query("SELECT * from users where email = ?", [
    mail,
  ]);

  return data[0];
}

export async function Donations(id) {
  const [dono] = await pool.query("SELECT * from donations where id = ?", [id]);
  return dono;
}

export async function InsertDono(uid, when, where) {
  await pool.query("insert into donations (id, date, place) values(?, ?, ?)", [
    uid,
    when,
    where,
  ]);
}

export async function Inserer(name, group, email, address, contact, password) {
  await pool.query(
    "insert into users (name, blood_group, email, address, contact, password) values(?, ?, ?, ?, ?, ?)",
    [name, group, email, address, contact, password]
  );
}

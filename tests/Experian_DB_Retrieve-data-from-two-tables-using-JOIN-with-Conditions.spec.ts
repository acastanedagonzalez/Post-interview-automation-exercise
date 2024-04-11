import { test, expect } from '@playwright/test';
import DB from "./db";

const connectToDB = new DB();
const pwd = "Test123";

async function establishDBConnection() {
  try {
    await connectToDB.getDBConnection();
  } catch (error) {
    console.log(`---------> X Failed to connect to dataBase <--------- \n\n ${error}`);
    process.exit(1);
  }
}

  test("Experian_DB_Retrieve-data-from-two-tables-using-JOIN-with-Conditions", async ({ page, dataBase, loginPage }) => {
    //Establish DB connection
    await establishDBConnection();
    await dataBase.executeQuery(`INSERT INTO public."User" (username, password) VALUES ('testUser', '${pwd}');`)
    await loginPage.loginWith("testUser", "Test123")
    //Execute Query to tables
    //Join id from table1.id and table2.id.
    await connectToDB.executeQuery('USE [db Name] (NOLOCK) SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id; ')
    //Include only records >=40 from table2.age.
    await connectToDB.executeQuery('USE [db Name] (NOLOCK) SELECT * FROM table2 WHERE table2.age >=40; ')
    //Sort ASC from table1.name
    await connectToDB.executeQuery('select * from table1 ORDER BY table1.name ASC; ')
  });

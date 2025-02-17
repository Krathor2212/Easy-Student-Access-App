import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const databaseFileName = "database.db";

async function openDatabase() {
  const dbFileUri = `${FileSystem.documentDirectory}${databaseFileName}`;
  const dbFileExists = await FileSystem.getInfoAsync(dbFileUri);

  if (!dbFileExists.exists) {
    // Copy the database file from the assets folder to the document directory
    const asset = Asset.fromModule(require('../../assets/database.db'));
    await FileSystem.downloadAsync(asset.uri, dbFileUri);
  }

  return SQLite.openDatabase(databaseFileName);
}

let db: SQLite.WebSQLDatabase | null = null;

export const initializeDatabase = async () => {
  console.log("Initializing database...");
  db = await openDatabase();
  setupDatabase();
  console.log("Database initialized.");
};

export const setupDatabase = () => {
  if (!db) {
    console.error("Database is not initialized");
    return;
  }
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_name TEXT NOT NULL,
        no_of_hours INTEGER NOT NULL,
        department TEXT NOT NULL,
        semester TEXT NOT NULL
      );`,
      [],
      () => console.log("✅ Subjects table is ready"),
      (_, error) => console.error("❌ Error creating table", error)
    );
  });
};

export const fetchDepartments = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error("Database is not initialized");
      reject("Database is not initialized");
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
        [],
        (_, { rows }) => {
          console.log('Fetched tables:', rows._array);
          resolve(rows._array.map(row => row.name));
        },
        (_, error) => {
          console.error("❌ Error fetching departments:", error);
          reject(error);
        }
      );
    });
  });
};

export const fetchSubjects = (department: string, semester: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error("Database is not initialized");
      reject("Database is not initialized");
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${department} WHERE sem_offered = ?;`,
        [semester],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          console.error("❌ Error fetching subjects:", error);
          reject(error);
        }
      );
    });
  });
};

export default initializeDatabase;
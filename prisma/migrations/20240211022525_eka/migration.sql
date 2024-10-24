-- CreateTable
CREATE TABLE "Ajelu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reitti" TEXT NOT NULL,
    "kilometrit" INTEGER NOT NULL DEFAULT 0,
    "kuskiID" INTEGER NOT NULL,
    "paiva" TEXT NOT NULL
);

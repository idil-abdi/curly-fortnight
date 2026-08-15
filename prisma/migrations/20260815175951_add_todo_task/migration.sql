-- CreateTable
CREATE TABLE "todo_tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "todo_tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todo_tasks" ADD CONSTRAINT "todo_tasks_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

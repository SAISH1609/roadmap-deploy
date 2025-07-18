SET session_replication_role = replica;
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-16 22:03:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5050 (class 0 OID 16393)
-- Dependencies: 217
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- TOC entry 5060 (class 0 OID 16457)
-- Dependencies: 227
-- Data for Name: roadmap_topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roadmap_topics VALUES (6, 1, 'SQL Keywords', 'SQL keywords are reserved words that have special meanings within SQL statements. These include commands (like SELECT, INSERT, UPDATE), clauses (such as WHERE, GROUP BY, HAVING), and other syntax elements that form the structure of SQL queries. Understanding SQL keywords is fundamental to writing correct and effective database queries. Keywords are typically case-insensitive but are often written in uppercase by convention for better readability.', NULL, NULL, 5, 1, true, '2025-07-14 23:46:58.60211+05:30');
INSERT INTO public.roadmap_topics VALUES (7, 1, 'Data Types', 'SQL data types define the kind of values that can be stored in a column and determine how the data is stored, processed, and retrieved. Common data types include numeric types (INTEGER, DECIMAL), character types (CHAR, VARCHAR), date and time types (DATE, TIMESTAMP), binary types (BLOB), and boolean types. Each database management system may have its own specific set of data types with slight variations. Choosing the appropriate data type for each column is crucial for optimizing storage, ensuring data integrity, and improving query performance.', NULL, NULL, 5, 2, true, '2025-07-14 23:55:57.716084+05:30');
INSERT INTO public.roadmap_topics VALUES (37, 2, 'Conditional Rendering', 'In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them.', NULL, NULL, 33, 4, true, '2025-07-15 12:58:03.890662+05:30');
INSERT INTO public.roadmap_topics VALUES (38, 2, 'Composition vs Inheritance', 'React has a powerful composition model, and it is recommended to use composition instead of inheritance to reuse code between components.', NULL, NULL, 33, 5, true, '2025-07-15 12:58:43.485246+05:30');
INSERT INTO public.roadmap_topics VALUES (40, 2, 'Component Life Cycle', 'React components have a lifecycle consisting of three phases: Mounting, Updating, and Unmounting along with several “lifecycle methods” that you can override to run code at particular times in the process. It is not recommended to use lifecycle methods manually. Instead, use the useEffect hook with functional components.', NULL, NULL, 39, 1, true, '2025-07-15 13:04:56.290903+05:30');
INSERT INTO public.roadmap_topics VALUES (41, 2, 'Lists and Keys', 'When you render lists in React, you can use the key prop to specify a unique key for each item. This key is used to identify which item to update when you want to update a specific item.', NULL, NULL, 39, 2, true, '2025-07-15 13:06:17.3095+05:30');
INSERT INTO public.roadmap_topics VALUES (42, 2, 'Renders Props', 'The term ''render props'' refers to a technique for sharing code between React components using a prop whose value is a function. A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.', NULL, NULL, 39, 3, true, '2025-07-15 13:08:23.731153+05:30');
INSERT INTO public.roadmap_topics VALUES (43, 2, 'Refs', 'Refs provide a way to access DOM nodes or React elements created in the render method. In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.', NULL, NULL, 39, 4, true, '2025-07-15 13:09:29.512874+05:30');
INSERT INTO public.roadmap_topics VALUES (11, 1, 'UPDATE Statement', 'The UPDATE statement in SQL is used to modify existing records in a table. It allows you to change the values of one or more columns based on specified conditions. The basic syntax includes specifying the table name, the columns to be updated with their new values, and optionally, a WHERE clause to filter which rows should be affected. UPDATE can be used in conjunction with subqueries, joins, and CTEs (Common Table Expressions) for more complex data modifications. It''s important to use UPDATE carefully, especially with the WHERE clause, to avoid unintended changes to data. In transactional databases, UPDATE operations can be rolled back if they''re part of a transaction that hasn''t been committed.', NULL, NULL, 5, 6, true, '2025-07-15 00:14:18.373894+05:30');
INSERT INTO public.roadmap_topics VALUES (56, 3, 'Learn the Basics', 'Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected.', NULL, NULL, NULL, 1, true, '2025-07-15 13:38:16.426263+05:30');
INSERT INTO public.roadmap_topics VALUES (31, 2, 'CLI Tools', '', NULL, NULL, NULL, 1, true, '2025-07-15 12:47:56.379806+05:30');
INSERT INTO public.roadmap_topics VALUES (65, 3, 'Tuples', 'Tuples are immutable sequences, meaning that once a tuple is created, its elements cannot be changed. Tuples are often used to store related pieces of information. They are defined by placing the elements inside parentheses () separated by commas.', NULL, NULL, 56, 9, true, '2025-07-15 18:03:51.525788+05:30');
INSERT INTO public.roadmap_topics VALUES (32, 2, 'Vite', 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.', NULL, NULL, 31, 1, true, '2025-07-15 12:51:39.924215+05:30');
INSERT INTO public.roadmap_topics VALUES (34, 2, 'Functional Components', 'Functional components are some of the more common components that will come across while working in React. These are simply JavaScript functions. We can create a functional component to React by writing a JavaScript function. These functions may or may not receive data as parameters. In the functional Components, the return value is the JSX code to render to the DOM tree. Functional components can also have state which is managed using React hooks.', NULL, NULL, 33, 1, true, '2025-07-15 12:53:41.052654+05:30');
INSERT INTO public.roadmap_topics VALUES (35, 2, 'JSX', 'JSX stands for JavaScript XML. It allows writing HTML in JavaScript and converts the HTML tags into React elements.', NULL, NULL, 33, 2, true, '2025-07-15 12:54:34.940791+05:30');
INSERT INTO public.roadmap_topics VALUES (36, 2, 'Props vs State', 'Props (short for “properties”) and state are both plain JavaScript objects. While both hold information that influences the output of component render, they are different in one important way: props get passed to the component (similar to function parameters) whereas state is managed within the component (similar to variables declared within a function).', NULL, NULL, 33, 3, true, '2025-07-15 12:55:23.867342+05:30');
INSERT INTO public.roadmap_topics VALUES (66, 3, 'Sets', 'Python Set is an unordered collection of data types that is iterable, mutable, and has no duplicate elements. The order of elements in a set is undefined though it may consist of various elements. The major advantage of using a set, as opposed to a list, is that it has a highly optimized method for checking whether a specific element is contained in the set.', NULL, NULL, 56, 10, true, '2025-07-15 18:07:22.001757+05:30');
INSERT INTO public.roadmap_topics VALUES (60, 3, 'Loops', 'Loops are used to execute a block of code repeatedly.', NULL, NULL, 56, 4, true, '2025-07-15 15:50:22.51521+05:30');
INSERT INTO public.roadmap_topics VALUES (75, 3, 'Modules', 'Modules refer to a file containing Python statements and definitions. A file containing Python code, for example: example.py, is called a module, and its module name would be example. We use modules to break down large programs into small manageable and organized files. Furthermore, modules provide reusability of code.', NULL, NULL, NULL, 3, true, '2025-07-15 18:49:02.750696+05:30');
INSERT INTO public.roadmap_topics VALUES (78, 3, 'Lambdas', 'Python Lambda Functions are anonymous function means that the function is without a name. As we already know that the def keyword is used to define a normal function in Python. Similarly, the lambda keyword is used to define an anonymous function in Python.', NULL, NULL, NULL, 4, true, '2025-07-15 18:57:49.616698+05:30');
INSERT INTO public.roadmap_topics VALUES (79, 3, 'Decorators', 'Decorator is a design pattern in Python that allows a user to add new functionality to an existing object without modifying its structure. Decorators are usually called before the definition of a function you want to decorate.', NULL, NULL, NULL, 5, true, '2025-07-15 18:58:26.251119+05:30');
INSERT INTO public.roadmap_topics VALUES (74, 3, 'Sorting Algorithms', 'Sorting refers to arranging data in a particular format. Sorting algorithm specifies the way to arrange data in a particular order. Most common orders are in numerical or lexicographical order. The importance of sorting lies in the fact that data searching can be optimized to a very high level, if data is stored in a sorted manner.', NULL, NULL, 68, 6, true, '2025-07-15 18:41:10.592592+05:30');
INSERT INTO public.roadmap_topics VALUES (76, 3, 'Builtin Modules', 'Python has a rich standard library of built-in modules that provide a wide range of functionality. Some of the most commonly used built-in modules include: sys, os, math, datetime, random, re, itertools, etc.', NULL, NULL, 75, 1, true, '2025-07-15 18:50:04.006337+05:30');
INSERT INTO public.roadmap_topics VALUES (77, 3, 'Custom Modules', 'Modules refer to a file containing Python statements and definitions. A file containing Python code, for example: example.py, is called a module, and its module name would be example. We use modules to break down large programs into small manageable and organized files. Furthermore, modules provide reusability of code.', NULL, NULL, 75, 2, true, '2025-07-15 18:56:20.306105+05:30');
INSERT INTO public.roadmap_topics VALUES (2, 1, 'What Are Relational Databases?', 'Relational databases are a type of database management system (DBMS) that stores and provides access to data points that are related to one another. Based on the relational model introduced by E.F. Codd in 1970, they use a structure that allows data to be organized into tables with rows and columns.

Key features include:
- Use of SQL (Structured Query Language) for querying and managing data
- Support for ACID transactions (Atomicity, Consistency, Isolation, Durability)
- Enforcement of data integrity through constraints (e.g., primary keys, foreign keys)
- Ability to establish relationships between tables, enabling complex queries and data retrieval
- Scalability and support for multi-user environments

Examples of popular relational database systems include MySQL, PostgreSQL, Oracle, and Microsoft SQL Server. They are widely used in various applications, from small-scale projects to large enterprise systems, due to their reliability, consistency, and powerful querying capabilities.', NULL, NULL, 1, 1, true, '2025-07-14 23:30:07.665696+05:30');
INSERT INTO public.roadmap_topics VALUES (81, 3, 'Regular Expressions', 'A regular expression is a sequence of characters that specifies a search pattern in text. Usually such patterns are used by string-searching algorithms for "find" or "find and replace" operations on strings, or for input validation.', NULL, NULL, NULL, 7, true, '2025-07-15 19:03:31.557248+05:30');
INSERT INTO public.roadmap_topics VALUES (80, 3, 'Iterators', 'An iterator is an object that contains a countable number of values. An iterator is an object that can be iterated upon, meaning that you can traverse through all the values. Technically, in Python, an iterator is an object which implements the iterator protocol, which consist of the methods iter() and next().', NULL, NULL, NULL, 6, true, '2025-07-15 18:59:24.201453+05:30');
INSERT INTO public.roadmap_topics VALUES (1, 1, 'Learn the Basics', 'Introduction:
SQL, which stands for Structured Query Language, is a programming language that is used to communicate with and manage databases. SQL is a standard language for manipulating data held in relational database management systems (RDBMS), or for stream processing in a relational data stream management system (RDSMS). It was first developed in the 1970s by IBM.
SQL consists of several components, each serving their own unique purpose in database communication:
Queries: This is the component that allows you to retrieve data from a database. The SELECT statement is most commonly used for this purpose.
Data Definition Language (DDL): It lets you create, alter, or delete databases and their related objects like tables, views, etc. Commands include CREATE, ALTER, DROP, and TRUNCATE.
Data Manipulation Language (DML): It lets you manage data within database objects. These commands include SELECT, INSERT, UPDATE, and DELETE.
Data Control Language (DCL): It includes commands like GRANT and REVOKE, which primarily deal with rights, permissions and other control-level management tasks for the database system.
SQL databases come in a number of forms, such as Oracle Database, Microsoft SQL Server, and MySQL. Despite their many differences, all SQL databases utilise the same language commands - SQL.', NULL, NULL, NULL, 1, true, '2025-07-14 23:21:53.153025+05:30');
INSERT INTO public.roadmap_topics VALUES (4, 1, 'SQL vs NoSQL Databases', 'SQL (relational) and NoSQL (non-relational) databases represent two different approaches to data storage and retrieval. SQL databases use structured schemas and tables, emphasizing data integrity and complex queries through joins. NoSQL databases offer more flexibility in data structures, often sacrificing some consistency for scalability and performance. The choice between SQL and NoSQL depends on factors like data structure, scalability needs, consistency requirements, and the nature of the application.', NULL, NULL, 1, 3, true, '2025-07-14 23:40:39.010543+05:30');
INSERT INTO public.roadmap_topics VALUES (8, 1, 'Operators', 'SQL operators are symbols or keywords used to perform operations on data within a database. They are essential for constructing queries that filter, compare, and manipulate data. Common types of operators include arithmetic operators (e.g., +, -, *, /), which perform mathematical calculations; comparison operators (e.g., =, !=, <, >), used to compare values; logical operators (e.g., AND, OR, NOT), which combine multiple conditions in a query; and set operators (e.g., UNION, INTERSECT, EXCEPT), which combine results from multiple queries. These operators enable precise control over data retrieval and modification.', NULL, NULL, 5, 3, true, '2025-07-14 23:57:49.679034+05:30');
INSERT INTO public.roadmap_topics VALUES (13, 1, 'Data Definition Language (DDL)', 'Data Definition Language (DDL) is a subset of SQL used to define and manage the structure of database objects. DDL commands include CREATE, ALTER, DROP, and TRUNCATE, which are used to create, modify, delete, and empty database structures such as tables, indexes, views, and schemas. These commands allow database administrators and developers to define the database schema, set up relationships between tables, and manage the overall structure of the database. DDL statements typically result in immediate changes to the database structure and can affect existing data.', NULL, NULL, NULL, 3, true, '2025-07-15 00:22:25.804121+05:30');
INSERT INTO public.roadmap_topics VALUES (33, 2, 'Components', 'Components are the building blocks of React applications. They let us split the UI into independent, reusable pieces, and think about each piece in isolation.', NULL, NULL, NULL, 2, true, '2025-07-15 12:52:35.937231+05:30');
INSERT INTO public.roadmap_topics VALUES (22, 1, 'GROUP BY', 'GROUP BY is an SQL clause used in SELECT statements to arrange identical data into groups. It is commonly paired with aggregate functions like COUNT, SUM, and AVG to perform calculations on each group. GROUP BY collects data across multiple records and groups the results based on one or more columns, enabling analysis at a higher level of granularity. This clause is essential for generating summary reports and performing data aggregations in relational databases.', NULL, NULL, 18, 4, true, '2025-07-15 12:33:19.827152+05:30');
INSERT INTO public.roadmap_topics VALUES (23, 1, 'ORDER BY', 'The ORDER BY clause in SQL is used to sort the result set of a query by one or more columns. By default, it sorts in ascending order, but descending order can be specified using the DESC keyword. The clause supports sorting by numeric, date, or text values. You can sort by multiple columns by listing them, each with its own sort direction. ORDER BY is crucial for presenting query results in a meaningful sequence, such as ordering records by timestamp or alphabetically by name.', NULL, NULL, 18, 5, true, '2025-07-15 12:34:14.375306+05:30');
INSERT INTO public.roadmap_topics VALUES (24, 1, 'HAVING', 'The HAVING clause is used in combination with the GROUP BY clause to filter grouped records based on aggregate functions like SUM, COUNT, AVG, MAX, or MIN. While the WHERE clause filters individual rows before grouping, HAVING filters the aggregated results after grouping. It allows you to apply conditions on summarized data, making it essential for generating meaningful insights from grouped queries.', NULL, NULL, 18, 6, true, '2025-07-15 12:34:37.457333+05:30');
INSERT INTO public.roadmap_topics VALUES (26, 1, 'SUM', 'SUM is an aggregate function in SQL used to calculate the total of a set of values. It''s commonly used with numeric columns in combination with GROUP BY clauses to compute totals for different categories or groups within the data. SUM is essential for financial calculations, statistical analysis, and generating summary reports from database tables. It ignores NULL values and can be used in conjunction with other aggregate functions for complex data analysis.', NULL, NULL, 25, 1, true, '2025-07-15 12:35:38.576514+05:30');
INSERT INTO public.roadmap_topics VALUES (27, 1, 'COUNT', 'COUNT is an SQL aggregate function that returns the number of rows that match the specified criteria. It can be used to count all rows in a table, non-null values in a specific column, or rows that meet certain conditions when combined with a WHERE clause. COUNT is often used in data analysis, reporting, and performance optimization queries to determine the size of datasets or the frequency of particular values.', NULL, NULL, 25, 2, true, '2025-07-15 12:35:56.158801+05:30');
INSERT INTO public.roadmap_topics VALUES (28, 1, 'AVG', 'The AVG() function in SQL is an aggregate function that calculates the average value of a numeric column. It returns the sum of all the values in the column, divided by the count of those values.', NULL, NULL, 25, 3, true, '2025-07-15 12:36:21.250781+05:30');
INSERT INTO public.roadmap_topics VALUES (29, 1, 'MIN', 'MIN is an aggregate function in SQL that returns the lowest value in a set of values. It works with numeric, date, or string data types, selecting the minimum value from a specified column. Often used in conjunction with GROUP BY, MIN can find the smallest value within each group. This function is useful for various data analysis tasks, such as identifying the lowest price, earliest date, or alphabetically first name in a dataset.', NULL, NULL, 25, 4, true, '2025-07-15 12:36:40.120794+05:30');
INSERT INTO public.roadmap_topics VALUES (5, 1, 'Basic SQL Syntax', 'Basic SQL syntax consists of straightforward commands that allow users to interact with a relational database. The core commands include SELECT for querying data, INSERT INTO for adding new records, UPDATE for modifying existing data, and DELETE for removing records. Queries can be filtered using WHERE, sorted with ORDER BY, and data from multiple tables can be combined using JOIN. These commands form the foundation of SQL, enabling efficient data manipulation and retrieval within a database.', NULL, NULL, NULL, 2, true, '2025-07-14 23:44:00.202345+05:30');
INSERT INTO public.roadmap_topics VALUES (18, 1, 'Data Manipulation Language (DML)', 'Data Manipulation Language (DML) is a subset of SQL used to manage data within database objects. It includes commands like SELECT, INSERT, UPDATE, and DELETE, which allow users to retrieve, add, modify, and remove data from tables. DML statements operate on the data itself rather than the database structure, enabling users to interact with the stored information. These commands are essential for day-to-day database operations, data analysis, and maintaining the accuracy and relevance of the data within a database system.', NULL, NULL, NULL, 4, true, '2025-07-15 00:39:14.386635+05:30');
INSERT INTO public.roadmap_topics VALUES (25, 1, 'Aggregate Queries', 'Aggregate queries in SQL are used to perform calculations on multiple rows of data, returning a single summary value or grouped results. These queries typically involve the use of aggregate functions, such as:

• COUNT(): Returns the number of rows that match a specific condition.
• SUM(): Calculates the total sum of a numeric column.
• AVG(): Computes the average value of a numeric column.
• MIN() and MAX(): Find the smallest and largest values in a column, respectively.
• GROUP BY: Used to group rows that share a common value in specified columns, allowing aggregate functions to be applied to each group.
• HAVING: Filters the results of a GROUP BY clause based on a specified condition, similar to WHERE but for groups.', NULL, NULL, NULL, 5, true, '2025-07-15 12:34:52.542343+05:30');
INSERT INTO public.roadmap_topics VALUES (39, 2, 'Rendering', 'React follows a declarative approach to rendering components, which means that developers specify what a component should look like, and React takes care of rendering the component to the screen. This is in contrast to an imperative approach, where developers would write code to manually manipulate the DOM (Document Object Model) to update the UI.

The virtual DOM (VDOM) is an important aspect of how React works. It is a lightweight in-memory representation of the DOM (Document Object Model), and it is used to optimize the rendering of components in a React application.

Components are written as JavaScript classes or functions that define a render method. The render method returns a description of what the component should look like, using JSX syntax.

When a component is rendered, React creates a virtual DOM (VDOM) representation of the component. The VDOM is a lightweight in-memory representation of the DOM, and it is used to optimize the rendering of components.

React compares the VDOM representation of the component with the previous VDOM representation (if it exists). If there are differences between the two VDOMs, React calculates the minimum number of DOM updates needed to bring the actual DOM into line with the new VDOM.

React updates the actual DOM with the minimum number of DOM updates needed to reflect the changes in the VDOM.

This process is known as reconciliation, and it is an important aspect of how React works. By using a declarative approach and a VDOM, React is able to optimize the rendering of components and improve the performance of web applications.', NULL, NULL, NULL, 3, true, '2025-07-15 13:03:12.058258+05:30');
INSERT INTO public.roadmap_topics VALUES (46, 2, 'Hooks', 'Hooks were introduced in React 16.8 and they let us use React''s features-like managing your component''s state and or performing an after effect when certain changes occur in state(s) without writing a class.', NULL, NULL, NULL, 4, true, '2025-07-15 13:14:41.707617+05:30');
INSERT INTO public.roadmap_topics VALUES (68, 3, 'Data Structures and Algorithms', 'A data structure is a named location that can be used to store and organize data. And, an algorithm is a collection of steps to solve a particular problem. Learning data structures and algorithms allow us to write efficient and optimized computer programs.', NULL, NULL, NULL, 2, true, '2025-07-15 18:09:58.575535+05:30');
INSERT INTO public.roadmap_topics VALUES (3, 1, 'RDBMS Benefits and Limitations', 'Here are some of the benefits of using an RDBMS:

1. **Structured Data**: RDBMS allows data storage in a structured way, using rows and columns in tables. This makes it easy to manipulate the data using SQL (Structured Query Language), ensuring efficient and flexible usage.

2. **ACID Properties**: ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties ensure reliable and safe data manipulation in a RDBMS, making it suitable for mission-critical applications.

3. **Normalization**: RDBMS supports data normalization, a process that organizes data in a way that reduces data redundancy and improves data integrity.

4. **Scalability**: RDBMSs generally provide good scalability options, allowing for the addition of more storage or computational resources as the data and workload grow.

5. **Data Integrity**: RDBMS provides mechanisms like constraints, primary keys, and foreign keys to enforce data integrity and consistency, ensuring that the data is accurate and reliable.

6. **Security**: RDBMSs offer various security features such as user authentication, access control, and data encryption to protect sensitive data.

Here are some of the limitations of using an RDBMS:

1. **Complexity**: Setting up and managing an RDBMS can be complex, especially for large applications. It requires technical knowledge and skills to manage, tune, and optimize the database.

2. **Cost**: RDBMSs can be expensive, both in terms of licensing fees and the computational and storage resources they require.

3. **Fixed Schema**: RDBMS follows a rigid schema for data organization, which means any changes to the schema can be time-consuming and complicated.

4. **Handling of Unstructured Data**: RDBMSs are not suitable for handling unstructured data like multimedia files, social media posts, and sensor data, as their relational structure is optimized for structured data.

5. **Horizontal Scalability**: RDBMSs are not as easily horizontally scalable as NoSQL databases. Scaling horizontally, which involves adding more machines to the system, can be challenging in terms of cost and complexity.', NULL, NULL, 1, 2, true, '2025-07-14 23:35:28.676458+05:30');
INSERT INTO public.roadmap_topics VALUES (52, 2, 'useReducer', 'useReducer: An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method. (If you’re familiar with Redux, you already know how this works.)', NULL, NULL, 46, 6, true, '2025-07-15 13:22:46.315628+05:30');
INSERT INTO public.roadmap_topics VALUES (9, 1, 'SELECT Statement', 'SELECT is one of the most fundamental SQL commands, used to retrieve data from one or more tables in a database. It allows you to specify which columns to fetch, apply filtering conditions, sort results, and perform various operations on the data. The SELECT statement is versatile, supporting joins, subqueries, aggregations, and more, making it essential for data querying and analysis in relational databases.', NULL, NULL, 5, 4, true, '2025-07-14 23:59:53.049107+05:30');
INSERT INTO public.roadmap_topics VALUES (10, 1, 'INSERT Statement', 'The "INSERT" statement is used to add new rows of data to a table in a database. There are two main forms of the INSERT command: INSERT INTO which, if columns are not named, expects a full set of columns, and INSERT INTO table_name (column1, column2, ...) where only named columns will be filled with data.', NULL, NULL, 5, 5, true, '2025-07-15 00:04:42.212595+05:30');
INSERT INTO public.roadmap_topics VALUES (12, 1, 'DELETE Statement', 'DELETE is an SQL statement used to remove one or more rows from a table. It allows you to specify which rows to delete using a WHERE clause, or delete all rows if no condition is provided. DELETE is part of the Data Manipulation Language (DML) and is used for data maintenance, removing outdated or incorrect information, or implementing business logic that requires data removal. When used without a WHERE clause, it empties the entire table while preserving its structure, unlike the TRUNCATE command.', NULL, NULL, 5, 7, true, '2025-07-15 00:18:27.532459+05:30');
INSERT INTO public.roadmap_topics VALUES (14, 1, 'TRUNCATE TABLE', 'The TRUNCATE TABLE statement is a Data Definition Language (DDL) operation that is used to mark the extents of a table for deallocation (empty for reuse). The result of this operation quickly removes all data from a table, typically bypassing a number of integrity enforcing mechanisms intended to protect data (like triggers).

It effectively eliminates all records in a table, but not the table itself. Unlike the DELETE statement, TRUNCATE TABLE does not generate individual row delete statements, so the usual overhead for logging or locking does not apply.', NULL, NULL, 13, 1, true, '2025-07-15 00:24:06.037862+05:30');
INSERT INTO public.roadmap_topics VALUES (15, 1, 'ALTER TABLE', 'The ALTER TABLE statement in SQL is used to modify the structure of an existing table. This includes adding, dropping, or modifying columns, changing the data type of a column, setting default values, and adding or dropping primary or foreign keys.', NULL, NULL, 13, 2, true, '2025-07-15 00:26:01.277245+05:30');
INSERT INTO public.roadmap_topics VALUES (16, 1, 'CREATE TABLE', 'CREATE TABLE is an SQL statement used to define and create a new table in a database. It specifies the table name, column names, data types, and optional constraints such as primary keys, foreign keys, and default values. This statement establishes the structure of the table, defining how data will be stored and organized within it. CREATE TABLE is a fundamental command in database management, essential for setting up the schema of a database and preparing it to store data.', NULL, NULL, 13, 3, true, '2025-07-15 00:28:46.21536+05:30');
INSERT INTO public.roadmap_topics VALUES (17, 1, 'DROP TABLE', 'The DROP TABLE statement is a Data Definition Language (DDL) operation that is used to completely remove a table from the database. This operation deletes the table structure along with all the data in it, effectively removing the table from the database system.

When you execute the DROP TABLE statement, it eliminates both the table and its data, as well as any associated indexes, constraints, and triggers. Unlike the TRUNCATE TABLE statement, which only removes data but keeps the table structure, DROP TABLE removes everything associated with the table.', NULL, NULL, 13, 4, true, '2025-07-15 00:32:31.70217+05:30');
INSERT INTO public.roadmap_topics VALUES (19, 1, 'FROM Clause', 'The FROM clause in SQL specifies the tables from which the retrieval should be made. It is an integral part of SELECT statements and variants like SELECT INTO and SELECT WHERE. FROM can also be used to join tables. Typically, FROM is followed by a space-delimited list of tables on which the SELECT operation is to be executed. If you need to pull data from multiple tables, you separate each table with a comma.', NULL, NULL, 18, 1, true, '2025-07-15 12:31:34.01971+05:30');
INSERT INTO public.roadmap_topics VALUES (20, 1, 'WHERE Clause', 'SQL provides a WHERE clause that is used to filter records based on specific conditions. If the condition specified in the WHERE clause is satisfied, only then are the matching records returned from the table. The WHERE clause helps in fetching only the necessary data. It is not limited to the SELECT statement—it is also commonly used with UPDATE and DELETE operations to target specific rows based on conditions.', NULL, NULL, 18, 2, true, '2025-07-15 12:32:22.337237+05:30');
INSERT INTO public.roadmap_topics VALUES (21, 1, 'JOINs', 'SQL JOINs are clauses used to combine rows from two or more tables based on a related column between them. They enable data retrieval across multiple tables in a single query, allowing for comprehensive data analysis. The primary types of JOINs include: INNER JOIN (returns matching rows from both tables), LEFT JOIN (returns all rows from the left table and matching rows from the right), RIGHT JOIN (returns all rows from the right table and matching rows from the left), and FULL JOIN (returns all rows when there''s a match in either table). JOINs are essential for integrating and exploring related data in relational databases.', NULL, NULL, 18, 3, true, '2025-07-15 12:32:43.073263+05:30');
INSERT INTO public.roadmap_topics VALUES (30, 1, 'MAX', 'MAX is an aggregate function in SQL that returns the highest value in a set of values. It can be used with numeric, date, or string data types, selecting the maximum value from a specified column. MAX is often used in combination with GROUP BY to find the highest value within each group. This function is useful for various data analysis tasks, such as finding the highest salary, the most recent date, or the alphabetically last name in a dataset.', NULL, NULL, 25, 5, true, '2025-07-15 12:36:57.061022+05:30');
INSERT INTO public.roadmap_topics VALUES (44, 2, 'Events', 'Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:

-React events are named using camelCase, rather than lowercase.
-With JSX you pass a function as the event handler, rather than a string.', NULL, NULL, 39, 5, true, '2025-07-15 13:10:53.355001+05:30');
INSERT INTO public.roadmap_topics VALUES (45, 2, 'High Order Components', 'A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

Concretely, a higher-order component is a function that takes a component and returns a new component.

Higher-order components are not commonly used in modern React code. In order to reuse logic, React hooks are mainly used now.', NULL, NULL, 39, 6, true, '2025-07-15 13:12:30.112609+05:30');
INSERT INTO public.roadmap_topics VALUES (47, 2, 'useEffect Hook', 'useEffect is a special hook that lets you run side effects in React. It is similar to componentDidMount and componentDidUpdate, but it only runs when the component (or some of its props) changes and during the initial mount.', NULL, NULL, 46, 1, true, '2025-07-15 13:17:18.471541+05:30');
INSERT INTO public.roadmap_topics VALUES (48, 2, 'useState Hook', 'useState hook is used to manage the state of a component in functional components. Calling useState returns an array with two elements: the current state value and a function to update the state.', NULL, NULL, 46, 2, true, '2025-07-15 13:18:28.636245+05:30');
INSERT INTO public.roadmap_topics VALUES (49, 2, 'useContext Hook', 'The useContext Hook lets us share data between components without having to pass props down through every level of the component tree. This is particularly useful when many components need to access the same data or when components are deeply nested.', NULL, NULL, 46, 3, true, '2025-07-15 13:19:20.405167+05:30');
INSERT INTO public.roadmap_topics VALUES (50, 2, 'useMemo', 'useMemo is a React hook that memoizes the result of a function. It is used to optimize performance by caching the result of a function and returning the cached result when the inputs to the function have not changed.', NULL, NULL, 46, 4, true, '2025-07-15 13:20:41.915016+05:30');
INSERT INTO public.roadmap_topics VALUES (51, 2, 'useRef', 'useRef is a React hook that provides a way to create a mutable reference that persists across component re-renders. It stores a value that doesn''t cause re-renders when it changes.', NULL, NULL, 46, 5, true, '2025-07-15 13:21:55.768039+05:30');
INSERT INTO public.roadmap_topics VALUES (53, 2, 'useCallback', 'useCallback is a React hook that returns a memoized version of a callback function. It''s used to optimize performance by preventing unnecessary re-renders. Specifically, it helps avoid recreating functions when their dependencies haven''t changed, which can be useful when passing callbacks to child components that rely on referential equality to prevent re-rendering.', NULL, NULL, 46, 7, true, '2025-07-15 13:23:52.874998+05:30');
INSERT INTO public.roadmap_topics VALUES (54, 2, 'Writing Custom Hooks', 'Building your own Hooks lets you extract component logic into reusable functions.', NULL, NULL, 46, 8, true, '2025-07-15 13:25:09.825477+05:30');
INSERT INTO public.roadmap_topics VALUES (55, 2, 'Hooks Best Practices', 'To fully leverage the capabilities of React Hooks, it is crucial to adopt best practices that not only enhance code readability but also optimize performance. By adhering to these practices, developers can create cleaner, more maintainable components that make the most of React''s powerful features, leading to a more efficient and enjoyable development experience.', NULL, NULL, 46, 9, true, '2025-07-15 13:26:11.141331+05:30');
INSERT INTO public.roadmap_topics VALUES (57, 3, 'Basic Syntax', 'Setup the environment for python and get started with the basics.', NULL, NULL, 56, 1, true, '2025-07-15 13:39:59.321953+05:30');
INSERT INTO public.roadmap_topics VALUES (58, 3, 'Variables and Data Types', 'Variables are used to store information to be referenced and manipulated in a computer program. They also provide a way of labeling data with a descriptive name, so our programs can be understood more clearly by the reader and ourselves. It is helpful to think of variables as containers that hold information. Their sole purpose is to label and store data in memory. This data can then be used throughout your program.', NULL, NULL, 56, 2, true, '2025-07-15 13:41:43.523379+05:30');
INSERT INTO public.roadmap_topics VALUES (59, 3, 'Conditionals', 'Conditional Statements in Python perform different actions depending on whether a specific condition evaluates to true or false. Conditional Statements are handled by if-elif-else statements and MATCH-CASE statements in Python.', NULL, NULL, 56, 3, true, '2025-07-15 15:48:23.051363+05:30');
INSERT INTO public.roadmap_topics VALUES (61, 3, 'Typecasting', 'The process of converting the value of one data type (integer, string, float, etc.) to another data type is called type conversion. Python has two types of type conversion: Implicit and Explicit.', NULL, NULL, 56, 5, true, '2025-07-15 16:57:05.006728+05:30');
INSERT INTO public.roadmap_topics VALUES (62, 3, 'Exceptions', 'Python exceptions are events that occur during the execution of a program and disrupt the normal flow of the program''s instructions. When an exception is raised, it indicates that an error has occurred. Python provides a way to handle these exceptions using try-except blocks, allowing developers to manage errors gracefully and ensure the program can continue or exit smoothly.', NULL, NULL, 56, 6, true, '2025-07-15 17:28:41.851499+05:30');
INSERT INTO public.roadmap_topics VALUES (63, 3, 'Functions', 'In programming, a function is a reusable block of code that executes a certain functionality when it is called. Functions are integral parts of every programming language because they help make your code more modular and reusable. In Python, we define a function with the def keyword, then write the function identifier (name) followed by parentheses and a colon.

Example:
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Roadmap.sh")
```', NULL, NULL, 56, 7, true, '2025-07-15 17:32:10.686878+05:30');
INSERT INTO public.roadmap_topics VALUES (64, 3, 'Lists', 'Lists: A list is just like dynamic sized arrays, declared in other languages (vector in C++ and ArrayList in Java). Lists need not be homogeneous always which makes it the most powerful tool in Python.

Tuple: A Tuple is a collection of Python objects separated by commas. In some ways, a tuple is similar to a list in terms of indexing, nested objects, and repetition but a tuple is immutable, unlike lists that are mutable.

Set: A Set is an unordered collection data type that is iterable, mutable, and has no duplicate elements. Python’s set class represents the mathematical notion of a set.

Dictionary: In Python, Dictionary is an ordered (since Python 3.7) collection of data values, used to store data values like a map. Unlike other Data Types that hold only a single value as an element, a Dictionary holds key:value pairs, which makes it more optimized.', NULL, NULL, 56, 8, true, '2025-07-15 18:02:37.611687+05:30');
INSERT INTO public.roadmap_topics VALUES (67, 3, 'Dictionaries', 'In Python, a dictionary is a built-in data type that allows you to store key-value pairs. Each key in the dictionary is unique, and each key is associated with a value. Starting from Python 3.7, dictionaries maintain the order of items as they were added.', NULL, NULL, 56, 11, true, '2025-07-15 18:08:34.759507+05:30');
INSERT INTO public.roadmap_topics VALUES (69, 3, 'Arrays and Linked lists', 'Arrays store elements in contiguous memory locations, resulting in easily calculable addresses for the elements stored and this allows faster access to an element at a specific index. Linked lists are less rigid in their storage structure and elements are usually not stored in contiguous locations, hence they need to be stored with additional tags giving a reference to the next element. This difference in the data storage scheme decides which data structure would be more suitable for a given situation.', NULL, NULL, 68, 1, true, '2025-07-15 18:20:03.329776+05:30');
INSERT INTO public.roadmap_topics VALUES (70, 3, 'Hash Tables', 'Hash Table, Map, HashMap, Dictionary or Associative are all the names of the same data structure. It is a data structure that implements a set abstract data type, a structure that can map keys to values.', NULL, NULL, 68, 2, true, '2025-07-15 18:22:03.629716+05:30');
INSERT INTO public.roadmap_topics VALUES (71, 3, 'Stack, Queue, and Heap', 'Stacks: Operations are performed LIFO (last in, first out), which means that the last element added will be the first one removed. A stack can be implemented using an array or a linked list. If the stack runs out of memory, it’s called a stack overflow.

Queue: Operations are performed FIFO (first in, first out), which means that the first element added will be the first one removed. A queue can be implemented using an array.

Heap: A tree-based data structure in which the value of a parent node is ordered in a certain way with respect to the value of its child node(s). A heap can be either a min heap (the value of a parent node is less than or equal to the value of its children) or a max heap (the value of a parent node is greater than or equal to the value of its children).', NULL, NULL, 68, 3, true, '2025-07-15 18:25:05.747408+05:30');
INSERT INTO public.roadmap_topics VALUES (72, 3, 'Binary Search Trees', 'A binary search tree, also called an ordered or sorted binary tree, is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node''s left subtree and less than the ones in its right subtree.', NULL, NULL, 68, 4, true, '2025-07-15 18:34:15.232733+05:30');
INSERT INTO public.roadmap_topics VALUES (73, 3, 'Recursion', 'Recursion is a method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem. Recursion solves such recursive problems by using functions that call themselves from within their own code.', NULL, NULL, 68, 5, true, '2025-07-15 18:35:32.504387+05:30');


--
-- TOC entry 5056 (class 0 OID 16423)
-- Dependencies: 223
-- Data for Name: roadmaps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roadmaps VALUES (3, 'Python Developer', 'python', 'Step by step guide to becoming a Python developer in 2025', 'Programming', true, 26, NULL, '2025-07-14 20:22:47.561646+05:30', '2025-07-15 19:03:31.57783+05:30');
INSERT INTO public.roadmaps VALUES (2, 'React Developer', 'react', 'Everything that is there to learn about React and the ecosystem in 2025.', 'Frontend', true, 25, NULL, '2025-07-14 20:15:13.124878+05:30', '2025-07-15 13:26:11.158522+05:30');
INSERT INTO public.roadmaps VALUES (1, 'SQL Roadmap', 'sql', 'Step by step guide to learning SQL in 2025', 'Database', true, 30, NULL, '2025-07-14 20:09:17.268571+05:30', '2025-07-15 12:36:57.148374+05:30');


--
-- TOC entry 5052 (class 0 OID 16399)
-- Dependencies: 219
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.skills VALUES (1, 'FastAPI', NULL, false, '2025-07-16 21:56:07.808913+05:30');
INSERT INTO public.skills VALUES (2, 'PostgreSQL', NULL, false, '2025-07-16 21:56:07.808913+05:30');
INSERT INTO public.skills VALUES (3, 'Python', NULL, false, '2025-07-16 21:56:07.808913+05:30');


--
-- TOC entry 5062 (class 0 OID 16478)
-- Dependencies: 229
-- Data for Name: team_invitations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.team_invitations VALUES (1, 1, 'saanvigude04@gmail.com', 'member', 'p4GlY7aKDsWB5FBH-_I_NEBdstfmU9Rwozs3hHBxtxg', false, 3, '2025-07-16 21:57:08.811258+05:30', '2025-07-23 16:27:08.839025+05:30');


--
-- TOC entry 5063 (class 0 OID 16500)
-- Dependencies: 230
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.team_members VALUES (1, 3, 'admin', '2025-07-16 21:56:07.984231+05:30');


--
-- TOC entry 5064 (class 0 OID 16516)
-- Dependencies: 231
-- Data for Name: team_roadmaps; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5066 (class 0 OID 16533)
-- Dependencies: 233
-- Data for Name: team_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.team_skills VALUES (1, 1, 1, false, '2025-07-16 21:56:07.808913+05:30');
INSERT INTO public.team_skills VALUES (2, 1, 2, false, '2025-07-16 21:56:07.808913+05:30');
INSERT INTO public.team_skills VALUES (3, 1, 3, false, '2025-07-16 21:56:07.808913+05:30');


--
-- TOC entry 5058 (class 0 OID 16441)
-- Dependencies: 225
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teams VALUES (1, 'Team BE', 'Backend Team', '', 3, '2025-07-16 21:56:07.808913+05:30', NULL);


--
-- TOC entry 5073 (class 0 OID 16608)
-- Dependencies: 240
-- Data for Name: topic_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5075 (class 0 OID 16638)
-- Dependencies: 242
-- Data for Name: topic_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.topic_resources VALUES (1, 1, 'SQL Tutorial - Mode', 'https://mode.com/sql-tutorial', 'article', true, '', 1, '2025-07-15 20:19:36.546866+05:30');
INSERT INTO public.topic_resources VALUES (2, 1, 'SQL Tutorial', 'https://www.sqltutorial.org/', 'article', true, '', 2, '2025-07-15 23:15:32.882489+05:30');
INSERT INTO public.topic_resources VALUES (3, 2, 'What is a relational database - AWS', 'https://aws.amazon.com/relational-database/', 'article', true, '', 1, '2025-07-15 23:26:39.68165+05:30');
INSERT INTO public.topic_resources VALUES (4, 2, 'What is a relational database?', 'https://www.youtube.com/watch?v=OqjJjpjDRLc', 'video', true, '', 2, '2025-07-15 23:28:36.570438+05:30');
INSERT INTO public.topic_resources VALUES (5, 3, 'Advantages and Disadvantages of DBMS', 'https://cloud.google.com/learn/what-is-a-relational-database', 'article', true, '', 1, '2025-07-15 23:29:36.035397+05:30');
INSERT INTO public.topic_resources VALUES (6, 4, 'Understanding SQL vs NoSQL Databases', 'https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql', 'article', true, '', 1, '2025-07-16 00:50:52.925923+05:30');
INSERT INTO public.topic_resources VALUES (7, 4, 'SQL vs NoSQL Databases in 4 mins', 'https://www.youtube.com/watch?v=_Ss42Vb1SU4', 'video', true, '', 2, '2025-07-16 00:51:10.68885+05:30');
INSERT INTO public.topic_resources VALUES (8, 5, 'SQL Tutorial - Mode', 'https://mode.com/sql-tutorial/', 'article', true, '', 1, '2025-07-16 00:53:26.680769+05:30');
INSERT INTO public.topic_resources VALUES (9, 5, 'SQL Tutorial', 'https://www.sqltutorial.org/', 'article', true, '', 2, '2025-07-16 00:53:49.138971+05:30');
INSERT INTO public.topic_resources VALUES (10, 6, 'SQL Keywords, Operators and Statements', 'https://blog.hubspot.com/website/sql-keywords-operators-statements', 'article', true, '', 1, '2025-07-16 00:54:24.513325+05:30');
INSERT INTO public.topic_resources VALUES (11, 7, 'SQL Data Types', 'https://www.digitalocean.com/community/tutorials/sql-data-types', 'article', true, '', 1, '2025-07-16 00:55:26.776428+05:30');
INSERT INTO public.topic_resources VALUES (12, 7, 'MySQL 101 - Data Types', 'https://www.youtube.com/watch?v=vAiBa69YCnk', 'video', true, '', 2, '2025-07-16 00:55:49.192084+05:30');
INSERT INTO public.topic_resources VALUES (13, 8, 'SQL Operators: 6 Different Types', 'https://www.dataquest.io/blog/sql-operators/', 'article', true, '', 1, '2025-07-16 00:56:24.159723+05:30');
INSERT INTO public.topic_resources VALUES (14, 10, 'SQL INSERT Statement', 'https://www.youtube.com/watch?v=Yp1MKeIG-M4', 'video', true, '', 1, '2025-07-16 00:58:03.607466+05:30');
INSERT INTO public.topic_resources VALUES (15, 11, 'Efficient column updates in SQL', 'https://www.atlassian.com/data/sql/how-to-update-a-column-based-on-a-filter-of-another-column', 'article', true, '', 1, '2025-07-16 00:58:40.872428+05:30');
INSERT INTO public.topic_resources VALUES (16, 12, 'DELETE', 'https://www.w3schools.com/sql/sql_delete.asp', 'article', true, '', 1, '2025-07-16 00:59:05.410643+05:30');
INSERT INTO public.topic_resources VALUES (17, 13, 'Data Definition Language (DDL)', 'https://docs.getdbt.com/terms/ddl', 'article', true, '', 1, '2025-07-16 00:59:32.130695+05:30');
INSERT INTO public.topic_resources VALUES (18, 13, 'The Definitive Guide on Data Definition Language', 'https://www.dbvis.com/thetable/sql-ddl-the-definitive-guide-on-data-definition-language/', 'article', true, '', 2, '2025-07-16 00:59:50.155511+05:30');
INSERT INTO public.topic_resources VALUES (19, 14, 'TRUNCATE TABLE', 'https://www.tutorialspoint.com/sql/sql-truncate-table.htm', 'article', true, '', 1, '2025-07-16 01:00:23.865775+05:30');
INSERT INTO public.topic_resources VALUES (20, 14, 'SQL Tutorial - TRUNCATE TABLE', 'https://www.youtube.com/watch?v=zJidbjOQlJM', 'video', true, '', 2, '2025-07-16 01:00:40.321528+05:30');
INSERT INTO public.topic_resources VALUES (21, 15, 'ALTER TABLE Statement', 'https://www.techonthenet.com/sql/tables/alter_table.php', 'article', true, '', 1, '2025-07-16 01:01:15.678454+05:30');
INSERT INTO public.topic_resources VALUES (22, 15, 'ALTER TABLE - PostgreSQL', 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-alter-table/', 'article', true, '', 2, '2025-07-16 01:01:32.036368+05:30');
INSERT INTO public.topic_resources VALUES (23, 16, 'CREATE TABLE', 'https://www.tutorialspoint.com/sql/sql-create-table.htm', 'article', true, '', 1, '2025-07-16 09:50:55.894879+05:30');
INSERT INTO public.topic_resources VALUES (24, 16, 'SQL CREATE TABLE', 'https://www.programiz.com/sql/create-table', 'article', true, '', 2, '2025-07-16 09:51:15.816087+05:30');
INSERT INTO public.topic_resources VALUES (25, 17, 'Drop a Table', 'https://www.coginiti.co/tutorials/beginner/drop-a-table/', 'article', true, '', 1, '2025-07-16 09:51:38.626695+05:30');
INSERT INTO public.topic_resources VALUES (26, 18, 'What is DML?', 'https://satoricyber.com/glossary/dml-data-manipulation-language', 'article', true, '', 1, '2025-07-16 09:52:04.450048+05:30');
INSERT INTO public.topic_resources VALUES (27, 18, 'What is DML?(Wiki)', 'https://en.wikipedia.org/wiki/Data_manipulation_language', 'article', true, '', 2, '2025-07-16 09:52:17.965156+05:30');
INSERT INTO public.topic_resources VALUES (28, 18, 'Difference Between DMS & DML', 'https://appmaster.io/blog/difference-between-ddl-and-dml', 'article', true, '', 3, '2025-07-16 09:52:31.857729+05:30');
INSERT INTO public.topic_resources VALUES (29, 19, 'How to write basic SQL', 'https://www.youtube.com/watch?v=YfTDBA45PHk', 'video', true, '', 1, '2025-07-16 09:52:59.825782+05:30');
INSERT INTO public.topic_resources VALUES (30, 20, 'WHERE Clause', 'https://www.w3schools.com/sql/sql_where.asp', 'article', true, '', 1, '2025-07-16 09:53:30.853084+05:30');
INSERT INTO public.topic_resources VALUES (31, 20, 'How to filter with the WHERE clause in SQL', 'https://www.youtube.com/watch?v=4Uv0o8IBqw0', 'video', true, '', 2, '2025-07-16 09:53:45.610251+05:30');
INSERT INTO public.topic_resources VALUES (32, 21, 'SQL JOINs Cheat Sheet', 'https://www.datacamp.com/cheat-sheet/sql-joins-cheat-sheet', 'article', true, '', 1, '2025-07-16 09:54:21.187118+05:30');
INSERT INTO public.topic_resources VALUES (33, 21, 'SQL JOINs Tutorial for beginners', 'https://www.youtube.com/watch?v=0OQJDd3QqQM', 'video', true, '', 2, '2025-07-16 09:54:39.755545+05:30');
INSERT INTO public.topic_resources VALUES (34, 22, 'SQL GROUP BY', 'https://www.programiz.com/sql/group-by', 'article', true, '', 1, '2025-07-16 09:55:07.474666+05:30');
INSERT INTO public.topic_resources VALUES (35, 22, 'Advanced Aggregate Functions in SQL', 'https://www.youtube.com/watch?v=nNrgRVIzeHg', 'video', true, '', 2, '2025-07-16 09:55:32.646717+05:30');
INSERT INTO public.topic_resources VALUES (36, 23, 'SQL ORDER BY Sorting Clause', 'https://www.youtube.com/watch?v=h_HHTNjAgS8', 'video', true, '', 1, '2025-07-16 09:56:01.357482+05:30');
INSERT INTO public.topic_resources VALUES (37, 24, 'SQL HAVING Clause', 'https://www.programiz.com/sql/having', 'article', true, '', 1, '2025-07-16 09:56:38.745164+05:30');
INSERT INTO public.topic_resources VALUES (38, 24, 'HAVING Clause', 'https://www.youtube.com/watch?v=tYBOMw7Ob8E', 'video', true, '', 2, '2025-07-16 09:56:56.016329+05:30');
INSERT INTO public.topic_resources VALUES (39, 26, 'SQL SUM', 'https://www.studysmarter.co.uk/explanations/computer-science/databases/sql-sum/', 'article', true, '', 1, '2025-07-16 09:57:37.799331+05:30');
INSERT INTO public.topic_resources VALUES (40, 27, 'COUNT SQL Function', 'https://www.datacamp.com/tutorial/count-sql-function', 'article', true, '', 1, '2025-07-16 09:58:07.849749+05:30');
INSERT INTO public.topic_resources VALUES (41, 28, 'AVG', 'https://www.sqlshack.com/sql-avg-function-introduction-and-examples/', 'article', true, '', 1, '2025-07-16 09:58:27.985357+05:30');
INSERT INTO public.topic_resources VALUES (42, 28, 'SQL AVG() Function', 'https://www.w3schools.com/sql/sql_avg.asp', 'article', true, '', 2, '2025-07-16 10:01:30.282069+05:30');
INSERT INTO public.topic_resources VALUES (43, 29, 'SQL MAX & MIN', 'https://www.programiz.com/sql/min-and-max', 'article', true, '', 1, '2025-07-16 10:01:58.763195+05:30');
INSERT INTO public.topic_resources VALUES (44, 29, 'COUNT, SUM, AVG, MIN, MAX (SQL) - Aggregating Data', 'https://www.youtube.com/watch?v=muwEdPsx534', 'video', true, '', 2, '2025-07-16 10:02:12.987756+05:30');
INSERT INTO public.topic_resources VALUES (45, 30, 'MAX', 'https://www.techonthenet.com/sql/max.php', 'article', true, '', 1, '2025-07-16 10:13:49.248859+05:30');
INSERT INTO public.topic_resources VALUES (46, 30, 'Basic Aggregate Functions', 'https://www.youtube.com/watch?v=jcoJuc5e3RE', 'video', true, '', 2, '2025-07-16 10:14:26.765519+05:30');
INSERT INTO public.topic_resources VALUES (47, 31, 'vite', 'https://vitejs.dev/', 'article', true, '', 1, '2025-07-16 18:13:31.094198+05:30');
INSERT INTO public.topic_resources VALUES (48, 31, 'Explore top posts about CLI', 'https://app.daily.dev/tags/cli?ref=roadmapsh', 'feed', true, '', 2, '2025-07-16 18:13:49.323057+05:30');
INSERT INTO public.topic_resources VALUES (49, 32, 'Vite Website', 'https://vitejs.dev/', 'official', true, '', 1, '2025-07-16 18:14:43.363053+05:30');
INSERT INTO public.topic_resources VALUES (50, 32, 'Vite Documentation', 'https://vitejs.dev/guide', 'official', true, '', 2, '2025-07-16 18:15:00.025531+05:30');
INSERT INTO public.topic_resources VALUES (51, 32, 'Vite Crash Course', 'https://youtu.be/LQQ3CR2JTX8', 'video', true, '', 3, '2025-07-16 18:15:20.764176+05:30');
INSERT INTO public.topic_resources VALUES (52, 32, 'Vite Crash Course | Faster Alternative To CRA | 2023', 'https://www.youtube.com/watch?v=89NJdbYTgJ8', 'video', true, '', 4, '2025-07-16 18:15:41.792638+05:30');
INSERT INTO public.topic_resources VALUES (53, 32, 'Explore top posts about Vite', 'https://app.daily.dev/tags/vite?ref=roadmapsh', 'feed', true, '', 5, '2025-07-16 18:16:11.621764+05:30');
INSERT INTO public.topic_resources VALUES (54, 33, 'Creating and nesting components', 'https://react.dev/learn#components', 'official', true, '', 1, '2025-07-16 18:18:11.647658+05:30');
INSERT INTO public.topic_resources VALUES (55, 33, 'Explore the different types of components in React', 'https://www.robinwieruch.de/react-component-types/', 'article', true, '', 2, '2025-07-16 18:18:29.896967+05:30');
INSERT INTO public.topic_resources VALUES (56, 33, 'What is the difference between components, elements, and instances?', 'https://www.robinwieruch.de/react-element-component/', 'article', true, '', 3, '2025-07-16 18:18:43.858263+05:30');
INSERT INTO public.topic_resources VALUES (57, 33, 'Components & Templates in React', 'https://www.youtube.com/watch?v=9D1x7-2FmTA', 'video', true, '', 4, '2025-07-16 18:18:59.177454+05:30');
INSERT INTO public.topic_resources VALUES (58, 34, 'Functional Components and Props', 'https://react.dev/reference/react/Component', 'official', true, '', 1, '2025-07-16 18:20:01.428159+05:30');
INSERT INTO public.topic_resources VALUES (59, 34, 'Your first component', 'https://react.dev/learn/your-first-component', 'official', true, '', 2, '2025-07-16 18:20:16.983246+05:30');
INSERT INTO public.topic_resources VALUES (60, 34, 'Passing props to a component', 'https://react.dev/learn/passing-props-to-a-component', 'official', true, '', 3, '2025-07-16 18:21:01.88914+05:30');
INSERT INTO public.topic_resources VALUES (61, 34, 'Functional Components in React', 'https://www.robinwieruch.de/react-function-component/', 'article', true, '', 4, '2025-07-16 18:21:15.295565+05:30');
INSERT INTO public.topic_resources VALUES (62, 34, 'React JS Functional Components', 'https://www.youtube.com/watch?v=NJ_qbsLf52w', 'video', true, '', 5, '2025-07-16 18:21:35.353809+05:30');
INSERT INTO public.topic_resources VALUES (63, 34, 'Explore top posts about React', 'https://app.daily.dev/tags/react?ref=roadmapsh', 'feed', true, '', 6, '2025-07-16 18:21:55.37772+05:30');
INSERT INTO public.topic_resources VALUES (64, 35, 'Writing markup with JSX', 'https://react.dev/learn/writing-markup-with-jsx', 'official', true, '', 1, '2025-07-16 18:26:23.277954+05:30');
INSERT INTO public.topic_resources VALUES (65, 35, 'JavaScript in JSX with Curly Braces', 'https://react.dev/learn/javascript-in-jsx-with-curly-braces', 'official', true, '', 2, '2025-07-16 18:26:41.105475+05:30');
INSERT INTO public.topic_resources VALUES (66, 35, 'Working with JSX - React - CodeGuage', 'https://www.codeguage.com/courses/react/jsx', 'article', true, '', 3, '2025-07-16 18:26:57.417394+05:30');
INSERT INTO public.topic_resources VALUES (67, 35, 'Explore top posts about JSX', 'https://app.daily.dev/tags/jsx?ref=roadmapsh', 'feed', true, '', 4, '2025-07-16 18:27:13.394769+05:30');
INSERT INTO public.topic_resources VALUES (68, 36, 'State: A Component''s Memory', 'https://react.dev/learn/state-a-components-memory', 'official', true, '', 1, '2025-07-16 18:28:27.266722+05:30');
INSERT INTO public.topic_resources VALUES (69, 36, 'How to use Props in React', 'https://www.robinwieruch.de/react-pass-props-to-component/', 'article', true, '', 2, '2025-07-16 18:28:46.247568+05:30');
INSERT INTO public.topic_resources VALUES (70, 36, 'What is the difference between state and props in React?', 'https://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react', 'article', true, '', 3, '2025-07-16 18:29:07.355228+05:30');
INSERT INTO public.topic_resources VALUES (71, 36, 'How to update state from props in React', 'https://www.robinwieruch.de/react-derive-state-props/', 'article', true, '', 4, '2025-07-16 18:29:22.834648+05:30');
INSERT INTO public.topic_resources VALUES (72, 37, 'Conditional Rendering', 'https://react.dev/learn/conditional-rendering', 'official', true, '', 1, '2025-07-16 18:29:48.64932+05:30');
INSERT INTO public.topic_resources VALUES (73, 37, 'Different techniques for conditional rendering in React', 'https://www.robinwieruch.de/conditional-rendering-react/', 'article', true, '', 2, '2025-07-16 18:30:06.569501+05:30');
INSERT INTO public.topic_resources VALUES (74, 37, 'Conditional rendering in React', 'https://www.youtube.com/watch?v=4oCVDkb_EIs', 'video', true, '', 3, '2025-07-16 18:30:21.99518+05:30');
INSERT INTO public.topic_resources VALUES (75, 38, 'Passing JSX as children', 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children', 'official', true, '', 1, '2025-07-16 18:31:00.160097+05:30');
INSERT INTO public.topic_resources VALUES (76, 38, 'Composition vs Inheritance', 'https://reactjs.org/docs/composition-vs-inheritance.html', 'article', true, '', 2, '2025-07-16 18:31:14.627224+05:30');
INSERT INTO public.topic_resources VALUES (77, 38, 'How to perform component composition in React', 'https://www.robinwieruch.de/react-component-composition/', 'article', true, '', 3, '2025-07-16 18:31:27.280704+05:30');
INSERT INTO public.topic_resources VALUES (78, 38, 'Achieving Reusability With React Composition', 'https://formidable.com/blog/2021/react-composition/', 'article', true, '', 4, '2025-07-16 18:31:44.113132+05:30');
INSERT INTO public.topic_resources VALUES (79, 39, 'Render and Commit - Official Docs', 'https://react.dev/learn/render-and-commit', 'official', true, '', 1, '2025-07-16 18:41:30.565859+05:30');
INSERT INTO public.topic_resources VALUES (80, 39, 'Rendering in React - ui.dev', 'https://ui.dev/why-react-renders', 'article', true, '', 2, '2025-07-16 18:41:45.334311+05:30');
INSERT INTO public.topic_resources VALUES (81, 39, 'Fix the slow render before you fix the re-render', 'https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render', 'article', true, '', 3, '2025-07-16 18:42:01.749366+05:30');
INSERT INTO public.topic_resources VALUES (82, 40, 'Lifecycle of Reactive Effects', 'https://react.dev/learn/lifecycle-of-reactive-effects', 'official', true, '', 1, '2025-07-16 18:42:38.347674+05:30');
INSERT INTO public.topic_resources VALUES (83, 40, 'Class Component', 'https://react.dev/reference/react/Component', 'official', true, '', 2, '2025-07-16 18:43:21.415789+05:30');
INSERT INTO public.topic_resources VALUES (84, 40, 'React component lifecycle: React lifecycle methods & hooks', 'https://tsh.io/blog/react-component-lifecycle-methods-vs-hooks/', 'article', true, '', 3, '2025-07-16 18:43:51.009696+05:30');
INSERT INTO public.topic_resources VALUES (85, 40, 'The React lifecycle: methods and hooks explained', 'https://retool.com/blog/the-react-lifecycle-methods-and-hooks-explained#react-hooks-and-the-component-lifecycle', 'article', true, '', 4, '2025-07-16 18:44:14.336595+05:30');
INSERT INTO public.topic_resources VALUES (86, 40, 'React Lifecycle: Methods & Hooks In Detail', 'https://www.bairesdev.com/blog/react-lifecycle-methods-hooks/', 'article', true, '', 5, '2025-07-16 18:44:32.983807+05:30');
INSERT INTO public.topic_resources VALUES (87, 40, 'lifecycle diagram', 'https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/', 'article', true, '', 6, '2025-07-16 18:44:49.549493+05:30');
INSERT INTO public.topic_resources VALUES (88, 41, 'Lists and Keys', 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key', 'official', true, '', 1, '2025-07-16 18:45:18.70447+05:30');
INSERT INTO public.topic_resources VALUES (89, 41, 'Rendering Lists', 'https://react.dev/learn/rendering-lists', 'official', true, '', 2, '2025-07-16 18:45:36.612508+05:30');
INSERT INTO public.topic_resources VALUES (90, 41, 'List components in React by Example', 'https://www.robinwieruch.de/react-list-component/', 'article', true, '', 3, '2025-07-16 18:45:51.337356+05:30');
INSERT INTO public.topic_resources VALUES (91, 41, 'Why do we need the key prop in React?', 'https://www.robinwieruch.de/react-list-key/', 'article', true, '', 4, '2025-07-16 18:46:06.531722+05:30');
INSERT INTO public.topic_resources VALUES (92, 42, 'Render Props in React', 'https://react.dev/learn/passing-props-to-a-component', 'official', true, '', 1, '2025-07-16 18:46:42.799929+05:30');
INSERT INTO public.topic_resources VALUES (93, 42, 'How to create a Render Prop Component', 'https://www.robinwieruch.de/react-render-props/', 'article', true, '', 2, '2025-07-16 18:47:10.64357+05:30');
INSERT INTO public.topic_resources VALUES (94, 42, 'Render Props Pattern', 'https://www.patterns.dev/posts/render-props-pattern/', 'article', true, '', 3, '2025-07-16 18:47:23.978506+05:30');
INSERT INTO public.topic_resources VALUES (95, 43, 'Referencing Values with Refs', 'https://react.dev/learn/referencing-values-with-refs', 'official', true, '', 1, '2025-07-16 18:48:02.062941+05:30');
INSERT INTO public.topic_resources VALUES (96, 43, 'Manipulating the DOM with Refs', 'https://react.dev/learn/manipulating-the-dom-with-refs', 'official', true, '', 2, '2025-07-16 18:48:20.927479+05:30');
INSERT INTO public.topic_resources VALUES (97, 43, 'Examples of using refs in React', 'https://www.robinwieruch.de/react-ref/', 'article', true, '', 3, '2025-07-16 18:48:33.672963+05:30');
INSERT INTO public.topic_resources VALUES (98, 43, 'The Complete Guide to useRef() and Refs in React', 'https://dmitripavlutin.com/react-useref-guide/', 'article', true, '', 4, '2025-07-16 18:48:50.585825+05:30');
INSERT INTO public.topic_resources VALUES (99, 43, 'What Exactly Are Refs? - React - CodeGuage', 'https://www.codeguage.com/courses/react/refs', 'article', true, '', 5, '2025-07-16 18:49:08.708228+05:30');
INSERT INTO public.topic_resources VALUES (100, 43, 'Learn useRef in 11 Minutes - Web Dev Simplified', 'https://www.youtube.com/watch?v=t2ypzz6gJm0', 'video', true, '', 6, '2025-07-16 18:49:21.332175+05:30');
INSERT INTO public.topic_resources VALUES (101, 44, 'Responding to Events', 'https://react.dev/learn/responding-to-events', 'official', true, '', 1, '2025-07-16 18:49:55.154844+05:30');
INSERT INTO public.topic_resources VALUES (102, 44, 'React Event Object (Synthetic Event)', 'https://react.dev/reference/react-dom/components/common#react-event-object', 'official', true, '', 2, '2025-07-16 18:50:09.961109+05:30');
INSERT INTO public.topic_resources VALUES (103, 44, 'React Event Handler', 'https://www.robinwieruch.de/react-event-handler/', 'article', true, '', 3, '2025-07-16 18:51:18.903453+05:30');
INSERT INTO public.topic_resources VALUES (104, 45, 'High-Order Components', 'https://reactjs.org/docs/higher-order-components.html', 'article', true, '', 1, '2025-07-16 18:52:01.229487+05:30');
INSERT INTO public.topic_resources VALUES (105, 45, 'How to create a Higher-Order Component', 'https://www.robinwieruch.de/react-higher-order-components/', 'article', true, '', 2, '2025-07-16 18:52:12.792301+05:30');
INSERT INTO public.topic_resources VALUES (106, 45, 'Learn React Higher Order Component (HOC) in 10 Minutes', 'https://youtu.be/J5P0q7EROfw?si=-8s5h1b0mZSGVgLt', 'video', true, '', 3, '2025-07-16 18:52:28.637657+05:30');
INSERT INTO public.topic_resources VALUES (107, 45, 'ReactJS Tutorial - Higher Order Components (Part 1)', 'https://www.youtube.com/watch?v=B6aNv8nkUSw', 'video', true, '', 4, '2025-07-16 18:52:42.376188+05:30');
INSERT INTO public.topic_resources VALUES (108, 45, 'ReactJS Tutorial - Higher Order Components (Part 2)', 'https://www.youtube.com/watch?v=rsBQj6X7UK8', 'video', true, '', 5, '2025-07-16 18:52:54.939951+05:30');
INSERT INTO public.topic_resources VALUES (109, 45, 'ReactJS Tutorial - Higher Order Components (Part 3)', 'https://www.youtube.com/watch?v=l8V59zIdBXU', 'video', true, '', 6, '2025-07-16 18:53:06.955216+05:30');
INSERT INTO public.topic_resources VALUES (110, 46, 'Hooks Reference', 'https://react.dev/reference/react', 'official', true, '', 1, '2025-07-16 18:54:02.251674+05:30');
INSERT INTO public.topic_resources VALUES (111, 46, 'Explore top posts about React Hooks', 'https://app.daily.dev/tags/react-hooks?ref=roadmapsh', 'feed', true, '', 2, '2025-07-16 18:54:16.95753+05:30');
INSERT INTO public.topic_resources VALUES (112, 47, 'Using the Effect Hook', 'https://react.dev/reference/react/useEffect', 'official', true, '', 1, '2025-07-16 20:39:27.829724+05:30');
INSERT INTO public.topic_resources VALUES (113, 47, 'React useEffect Hook by Example', 'https://www.robinwieruch.de/react-useeffect-hook/', 'article', true, '', 2, '2025-07-16 20:39:41.16997+05:30');
INSERT INTO public.topic_resources VALUES (114, 48, 'Using the State Hook', 'https://react.dev/reference/react/useState', 'official', true, '', 1, '2025-07-16 20:40:07.362289+05:30');
INSERT INTO public.topic_resources VALUES (115, 48, 'React useState Hook by Example', 'https://www.robinwieruch.de/react-usestate-hook/', 'article', true, '', 2, '2025-07-16 20:40:21.367552+05:30');
INSERT INTO public.topic_resources VALUES (116, 49, 'Using useContext', 'https://react.dev/reference/react/useContext', 'official', true, '', 1, '2025-07-16 20:41:00.090638+05:30');
INSERT INTO public.topic_resources VALUES (117, 49, 'Explore the concept of context', 'https://react.dev/learn/passing-data-deeply-with-context', 'official', true, '', 2, '2025-07-16 20:41:18.93516+05:30');
INSERT INTO public.topic_resources VALUES (118, 49, 'Learn useContext In 13 Minutes', 'https://www.youtube.com/watch?v=5LrDIWkK_Bc', 'video', true, '', 3, '2025-07-16 20:41:32.358722+05:30');
INSERT INTO public.topic_resources VALUES (119, 50, 'useMemo Docs', 'https://react.dev/reference/react/useMemo', 'official', true, '', 1, '2025-07-16 20:41:59.241476+05:30');
INSERT INTO public.topic_resources VALUES (120, 50, 'useMemo and useCallback - Josh W. Comeau', 'https://www.joshwcomeau.com/react/usememo-and-usecallback/', 'article', true, '', 2, '2025-07-16 20:42:13.069597+05:30');
INSERT INTO public.topic_resources VALUES (121, 51, 'useRef', 'https://react.dev/reference/react/useRef', 'official', true, '', 1, '2025-07-16 20:42:42.34103+05:30');
INSERT INTO public.topic_resources VALUES (122, 51, 'WebDevSimplified', 'https://www.youtube.com/watch?v=t2ypzz6gJm0', 'video', true, '', 2, '2025-07-16 20:43:15.539443+05:30');
INSERT INTO public.topic_resources VALUES (123, 52, 'useReducer Docs', 'https://react.dev/reference/react/useReducer', 'official', true, '', 1, '2025-07-16 20:43:40.529229+05:30');
INSERT INTO public.topic_resources VALUES (124, 52, 'The React useReducer Hook', 'https://www.telerik.com/blogs/react-usereducer-hook', 'article', true, '', 2, '2025-07-16 20:44:37.496723+05:30');
INSERT INTO public.topic_resources VALUES (125, 52, 'A guide to the React useReducer Hook', 'https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/', 'article', true, '', 3, '2025-07-16 20:44:53.650974+05:30');
INSERT INTO public.topic_resources VALUES (126, 52, 'Learn React Hooks: useReducer - Simply Explained!', 'https://www.youtube.com/watch?v=rgp_iCVS8ys&t', 'video', true, '', 4, '2025-07-16 20:45:12.881043+05:30');
INSERT INTO public.topic_resources VALUES (127, 53, 'React Documentation on useCallback', 'https://react.dev/reference/react/useCallback', 'article', true, '', 1, '2025-07-16 20:45:55.951158+05:30');
INSERT INTO public.topic_resources VALUES (128, 53, 'useCallback Explained in Depth', 'https://kentcdodds.com/blog/usememo-and-usecallback', 'article', true, '', 2, '2025-07-16 20:46:09.502278+05:30');
INSERT INTO public.topic_resources VALUES (129, 53, 'useCallback Hook: An Introductory Guide', 'https://dmitripavlutin.com/dont-overuse-react-usecallback/', 'article', true, '', 3, '2025-07-16 20:46:24.532413+05:30');
INSERT INTO public.topic_resources VALUES (130, 54, 'Reusing Logic with Custom Hooks', 'https://react.dev/learn/reusing-logic-with-custom-hooks', 'official', true, '', 1, '2025-07-16 20:46:52.937364+05:30');
INSERT INTO public.topic_resources VALUES (131, 54, 'How to create a custom Hook (2) followed by Examples', 'https://www.robinwieruch.de/react-custom-hook/', 'article', true, '', 2, '2025-07-16 20:48:49.710143+05:30');
INSERT INTO public.topic_resources VALUES (132, 54, 'Custom Hooks in React', 'https://www.youtube.com/watch?v=I2Bgi0Qcdvc', 'video', true, '', 3, '2025-07-16 20:49:03.511632+05:30');
INSERT INTO public.topic_resources VALUES (133, 54, 'Explore top posts about React Hooks', 'https://app.daily.dev/tags/react-hooks?ref=roadmapsh', 'feed', true, '', 4, '2025-07-16 20:49:17.16093+05:30');
INSERT INTO public.topic_resources VALUES (134, 55, 'Rules of Hooks', 'https://react.dev/reference/rules/rules-of-hooks/', 'official', true, '', 1, '2025-07-16 20:49:42.19759+05:30');
INSERT INTO public.topic_resources VALUES (135, 55, 'React Hooks Best Practices: Unlocking Efficiency and Elegance', 'https://medium.com/womenintechnology/react-hooks-best-practices-unlocking-efficiency-and-elegance-da23f7e1418a', 'article', true, '', 2, '2025-07-16 20:49:59.68191+05:30');
INSERT INTO public.topic_resources VALUES (136, 55, 'Mastering React Hooks: Best Practices and Common Pitfalls', 'https://dev.to/codesensei/mastering-react-hooks-best-practices-and-common-pitfalls-3d9i', 'article', true, '', 3, '2025-07-16 20:50:14.601607+05:30');
INSERT INTO public.topic_resources VALUES (137, 55, 'React Hooks Cheat Sheet: Best Practices with Examples', 'https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/', 'article', true, '', 4, '2025-07-16 20:50:30.573238+05:30');
INSERT INTO public.topic_resources VALUES (138, 55, 'React Custom Hooks: Best Practices and Examples', 'https://utopia-insights.dev/react-custom-hooks-best-practices-and-examples/', 'article', true, '', 5, '2025-07-16 20:51:05.073072+05:30');
INSERT INTO public.topic_resources VALUES (139, 56, 'Python Website', 'https://www.python.org/', 'official', true, '', 1, '2025-07-16 21:00:03.70309+05:30');
INSERT INTO public.topic_resources VALUES (140, 56, 'Python - Wiki', 'https://en.wikipedia.org/wiki/Python_(programming_language)', 'article', true, '', 2, '2025-07-16 21:00:20.989155+05:30');
INSERT INTO public.topic_resources VALUES (141, 56, 'Tutorial Series: How to Code in Python', 'https://www.digitalocean.com/community/tutorials/how-to-write-your-first-python-3-program', 'article', true, '', 3, '2025-07-16 21:00:35.551015+05:30');
INSERT INTO public.topic_resources VALUES (142, 56, 'Google''s Python Class', 'https://developers.google.com/edu/python', 'article', true, '', 4, '2025-07-16 21:00:51.094396+05:30');
INSERT INTO public.topic_resources VALUES (143, 56, 'Learn Python - Full Course', 'https://www.youtube.com/watch?v=4M87qBgpafk', 'video', true, '', 5, '2025-07-16 21:01:04.674604+05:30');
INSERT INTO public.topic_resources VALUES (144, 56, 'Explore top posts about Python', 'https://app.daily.dev/tags/python?ref=roadmapsh', 'feed', true, '', 6, '2025-07-16 21:01:17.048306+05:30');
INSERT INTO public.topic_resources VALUES (145, 57, 'Python Basics', 'https://www.tutorialspoint.com/python/python_basic_syntax.htm', 'article', true, '', 1, '2025-07-16 21:01:42.535763+05:30');
INSERT INTO public.topic_resources VALUES (146, 57, 'Learn X in Y Minutes / Python', 'https://learnxinyminutes.com/docs/python/', 'article', true, '', 2, '2025-07-16 21:01:56.831783+05:30');
INSERT INTO public.topic_resources VALUES (147, 57, 'Python for Beginners - Learn Python in 1 Hour', 'https://www.youtube.com/watch?v=kqtD5dpn9C8', 'video', true, '', 3, '2025-07-16 21:02:14.640862+05:30');
INSERT INTO public.topic_resources VALUES (148, 58, 'Variables in Python', 'https://realpython.com/python-variables', 'article', true, '', 1, '2025-07-16 21:02:36.399705+05:30');
INSERT INTO public.topic_resources VALUES (149, 58, 'Python for Beginners: Data Types', 'https://thenewstack.io/python-for-beginners-data-types/', 'article', true, '', 2, '2025-07-16 21:02:54.860002+05:30');
INSERT INTO public.topic_resources VALUES (150, 58, 'Python Variables and Data Types', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhN-sfWgCU1z_Qhakc1AGOn', 'video', true, '', 3, '2025-07-16 21:03:12.058541+05:30');
INSERT INTO public.topic_resources VALUES (151, 59, 'Conditional Statements in Python', 'https://realpython.com/python-variables', 'article', true, '', 1, '2025-07-16 21:03:47.948903+05:30');
INSERT INTO public.topic_resources VALUES (152, 59, 'Python for Beginners: Data Types', 'https://www.guru99.com/if-loop-python-conditional-structures.html', 'article', true, '', 2, '2025-07-16 21:04:08.633416+05:30');
INSERT INTO public.topic_resources VALUES (153, 59, 'Python Variables and Data Types', 'https://learnpython.com/blog/python-match-case-statement/', 'article', true, '', 3, '2025-07-16 21:04:21.98954+05:30');
INSERT INTO public.topic_resources VALUES (154, 60, 'Python "while" Loops (Indefinite Iteration)', 'https://realpython.com/python-while-loop/', 'article', true, '', 1, '2025-07-16 21:05:15.984485+05:30');
INSERT INTO public.topic_resources VALUES (155, 60, 'Python "for" Loops (Definite Iteration)', 'https://realpython.com/python-for-loop/#the-guts-of-the-python-for-loop', 'article', true, '', 2, '2025-07-16 21:06:32.857878+05:30');
INSERT INTO public.topic_resources VALUES (156, 60, 'Python For Loops', 'https://www.youtube.com/watch?v=KWgYha0clzw', 'video', true, '', 3, '2025-07-16 21:06:47.653794+05:30');
INSERT INTO public.topic_resources VALUES (157, 61, 'Type Conversion and Casting', 'https://www.programiz.com/python-programming/type-conversion-and-casting', 'article', true, '', 1, '2025-07-16 21:08:01.679654+05:30');
INSERT INTO public.topic_resources VALUES (158, 62, 'Exceptions Documentation', 'https://docs.python.org/3/tutorial/errors.html#exceptions', 'official', true, '', 1, '2025-07-16 21:08:28.318863+05:30');
INSERT INTO public.topic_resources VALUES (159, 62, 'Python Exceptions: An Introduction', 'https://realpython.com/python-exceptions/', 'article', true, '', 2, '2025-07-16 21:08:41.252411+05:30');
INSERT INTO public.topic_resources VALUES (160, 62, 'Errors and Exceptions', 'https://docs.python.org/3/tutorial/errors.html', 'article', true, '', 3, '2025-07-16 21:08:54.691781+05:30');
INSERT INTO public.topic_resources VALUES (161, 62, 'Python Exception Handling', 'https://www.programiz.com/python-programming/exception-handling', 'article', true, '', 4, '2025-07-16 21:09:11.504845+05:30');
INSERT INTO public.topic_resources VALUES (162, 62, 'Exception Handling in Python', 'https://www.youtube.com/watch?v=V_NXT2-QIlE', 'video', true, '', 5, '2025-07-16 21:09:25.130955+05:30');
INSERT INTO public.topic_resources VALUES (163, 63, 'Built-in Functions in Python', 'https://docs.python.org/3/library/functions.html', 'official', true, '', 1, '2025-07-16 21:10:20.84084+05:30');
INSERT INTO public.topic_resources VALUES (164, 63, 'Defining Python Functions', 'https://realpython.com/defining-your-own-python-function/', 'article', true, '', 2, '2025-07-16 21:10:31.940701+05:30');
INSERT INTO public.topic_resources VALUES (165, 64, 'Tuples vs. Lists vs. Sets in Python', 'https://jerrynsh.com/tuples-vs-lists-vs-sets-in-python/', 'article', true, '', 1, '2025-07-16 21:10:55.46594+05:30');
INSERT INTO public.topic_resources VALUES (166, 64, 'Python for Beginners: Lists', 'https://thenewstack.io/python-for-beginners-lists/', 'article', true, '', 2, '2025-07-16 21:11:14.977652+05:30');
INSERT INTO public.topic_resources VALUES (167, 64, 'Python for Beginners: When and How to Use Tuples', 'https://thenewstack.io/python-for-beginners-when-and-how-to-use-tuples/', 'article', true, '', 3, '2025-07-16 21:11:27.590113+05:30');
INSERT INTO public.topic_resources VALUES (168, 64, 'Difference Between List, Tuple, Set and Dictionary in Python', 'https://www.youtube.com/watch?v=n0krwG38SHI', 'video', true, '', 4, '2025-07-16 21:11:42.937326+05:30');
INSERT INTO public.topic_resources VALUES (169, 65, 'Tuples Documentation', 'https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences', 'official', true, '', 1, '2025-07-16 21:12:09.965576+05:30');
INSERT INTO public.topic_resources VALUES (170, 65, 'When and How to Use Tuples', 'https://thenewstack.io/python-for-beginners-when-and-how-to-use-tuples/', 'article', true, '', 2, '2025-07-16 21:12:27.443471+05:30');
INSERT INTO public.topic_resources VALUES (171, 65, 'Python''s tuple Data Type: A Deep Dive With Examples', 'https://realpython.com/python-tuple/#getting-started-with-pythons-tuple-data-type', 'article', true, '', 3, '2025-07-16 21:12:39.851687+05:30');
INSERT INTO public.topic_resources VALUES (172, 65, 'why are Tuples even a thing?', 'https://www.youtube.com/watch?v=fR_D_KIAYrE', 'video', true, '', 4, '2025-07-16 21:12:55.651753+05:30');
INSERT INTO public.topic_resources VALUES (173, 66, 'An In-Depth Guide to Working with Python Sets', 'https://learnpython.com/blog/python-sets/', 'article', true, '', 1, '2025-07-16 21:13:27.687908+05:30');
INSERT INTO public.topic_resources VALUES (174, 66, 'Python Sets tutorial for Beginners', 'https://www.youtube.com/watch?v=t9j8lCUGZXo', 'video', true, '', 2, '2025-07-16 21:13:40.59396+05:30');
INSERT INTO public.topic_resources VALUES (175, 67, 'Dictionaries in Python', 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries', 'official', true, '', 1, '2025-07-16 21:14:01.740136+05:30');
INSERT INTO public.topic_resources VALUES (176, 67, 'Dictionaries in Python', 'https://realpython.com/python-dicts/', 'article', true, '', 2, '2025-07-16 21:14:18.208853+05:30');
INSERT INTO public.topic_resources VALUES (177, 68, 'Visit Dedicated DSA Roadmap', 'https://roadmap.sh/datastructures-and-algorithms', 'roadmap', true, '', 1, '2025-07-16 21:15:06.268213+05:30');
INSERT INTO public.topic_resources VALUES (178, 68, 'Learn DS & Algorithms', 'https://www.programiz.com/dsa', 'article', true, '', 2, '2025-07-16 21:15:20.6169+05:30');
INSERT INTO public.topic_resources VALUES (179, 68, 'Data Structures Illustrated', 'https://www.youtube.com/playlist?list=PLkZYeFmDuaN2-KUIv-mvbjfKszIGJ4FaY', 'video', true, '', 3, '2025-07-16 21:15:33.784508+05:30');
INSERT INTO public.topic_resources VALUES (180, 68, 'Explore top posts about Algorithms', 'https://app.daily.dev/tags/algorithms?ref=roadmapsh', 'feed', true, '', 4, '2025-07-16 21:15:49.566105+05:30');
INSERT INTO public.topic_resources VALUES (181, 69, 'Arrays in Python', 'https://www.edureka.co/blog/arrays-in-python/', 'article', true, '', 1, '2025-07-16 21:16:19.965686+05:30');
INSERT INTO public.topic_resources VALUES (182, 69, 'Linked List Python', 'https://realpython.com/linked-lists-python/', 'article', true, '', 2, '2025-07-16 21:16:33.355377+05:30');
INSERT INTO public.topic_resources VALUES (183, 69, 'Array Data Structure | Illustrated Data Structures', 'https://www.youtube.com/watch?v=QJNwK2uJyGs', 'video', true, '', 3, '2025-07-16 21:16:46.130798+05:30');
INSERT INTO public.topic_resources VALUES (184, 69, 'Linked List Data Structure | Illustrated Data Structures', 'https://www.youtube.com/watch?v=odW9FU8jPRQ', 'video', true, '', 4, '2025-07-16 21:17:00.091927+05:30');
INSERT INTO public.topic_resources VALUES (185, 70, 'Build a Hash Table in Python', 'https://realpython.com/python-hash-table/', 'article', true, '', 1, '2025-07-16 21:17:23.741282+05:30');
INSERT INTO public.topic_resources VALUES (186, 70, 'Hash Tables and Hashmaps in Python', 'https://www.edureka.co/blog/hash-tables-and-hashmaps-in-python/', 'article', true, '', 2, '2025-07-16 21:17:36.197787+05:30');
INSERT INTO public.topic_resources VALUES (187, 70, 'Hash Table Data Structure | Illustrated Data Structures', 'https://www.youtube.com/watch?v=jalSiaIi8j4', 'video', true, '', 3, '2025-07-16 21:17:54.101195+05:30');
INSERT INTO public.topic_resources VALUES (188, 71, 'Heaps, Stacks, Queues', 'https://stephanosterburg.gitbook.io/scrapbook/coding/coding-interview/data-structures/heaps-stacks-queues', 'article', true, '', 1, '2025-07-16 21:18:23.502151+05:30');
INSERT INTO public.topic_resources VALUES (189, 71, 'How to Implement Python Stack?', 'https://realpython.com/how-to-implement-python-stack/', 'article', true, '', 2, '2025-07-16 21:18:37.002271+05:30');
INSERT INTO public.topic_resources VALUES (190, 71, 'Python Stacks, Queues, and Priority Queues in Practice', 'https://realpython.com/queue-in-python/', 'article', true, '', 3, '2025-07-16 21:18:50.360638+05:30');
INSERT INTO public.topic_resources VALUES (191, 71, 'Heap Implementation in Python', 'https://www.educative.io/answers/heap-implementation-in-python', 'article', true, '', 4, '2025-07-16 21:19:03.881228+05:30');
INSERT INTO public.topic_resources VALUES (192, 71, 'Stack Data Structure | Illustrated Data Structures', 'https://www.youtube.com/watch?v=I5lq6sCuABE', 'video', true, '', 5, '2025-07-16 21:19:41.504876+05:30');
INSERT INTO public.topic_resources VALUES (193, 71, 'Queue Data Structure | Illustrated Data StructuresQueue Data Structure | Illustrated Data Structures', 'https://www.youtube.com/watch?v=mDCi1lXd9hc', 'video', true, '', 6, '2025-07-16 21:19:55.801981+05:30');
INSERT INTO public.topic_resources VALUES (194, 72, 'How to Implement Binary Search Tree in Python', 'https://web.archive.org/web/20230601181553/https://www.section.io/engineering-education/implementing-binary-search-tree-using-python/', 'article', true, '', 1, '2025-07-16 21:20:20.89951+05:30');
INSERT INTO public.topic_resources VALUES (195, 72, 'Binary Search Tree in Python', 'https://www.pythonforbeginners.com/data-structures/binary-search-tree-in-python', 'article', true, '', 2, '2025-07-16 21:20:35.880852+05:30');
INSERT INTO public.topic_resources VALUES (196, 72, 'Tree Data Structure | Illustrated Data Structures', 'https://www.youtube.com/watch?v=S2W3SXGPVyU', 'video', true, '', 3, '2025-07-16 21:20:50.850953+05:30');
INSERT INTO public.topic_resources VALUES (197, 73, 'Recursion in Python: An Introduction', 'https://realpython.com/python-recursion/', 'article', true, '', 1, '2025-07-16 21:21:17.115608+05:30');
INSERT INTO public.topic_resources VALUES (198, 73, 'Explore top posts about Recursion', 'https://app.daily.dev/tags/recursion?ref=roadmapsh', 'feed', true, '', 2, '2025-07-16 21:21:29.616373+05:30');
INSERT INTO public.topic_resources VALUES (199, 74, 'Sorting Algorithms in Python', 'https://realpython.com/sorting-algorithms-python/', 'article', true, '', 1, '2025-07-16 21:22:03.344402+05:30');
INSERT INTO public.topic_resources VALUES (200, 74, 'Python - Sorting Algorithms', 'https://www.tutorialspoint.com/python_data_structure/python_sorting_algorithms.htm', 'article', true, '', 2, '2025-07-16 21:22:25.931699+05:30');
INSERT INTO public.topic_resources VALUES (201, 74, 'Explore top posts about Algorithms', 'https://app.daily.dev/tags/algorithms?ref=roadmapsh', 'feed', true, '', 3, '2025-07-16 21:22:42.194564+05:30');
INSERT INTO public.topic_resources VALUES (202, 75, 'Python Modules', 'https://docs.python.org/3/tutorial/modules.html', 'official', true, '', 1, '2025-07-16 21:23:04.790437+05:30');
INSERT INTO public.topic_resources VALUES (203, 75, 'Modules in Python', 'https://www.programiz.com/python-programming/modules', 'article', true, '', 2, '2025-07-16 21:23:17.485517+05:30');
INSERT INTO public.topic_resources VALUES (204, 76, 'Python Module Index', 'https://docs.python.org/3/py-modindex.html', 'official', true, '', 1, '2025-07-16 21:23:41.689672+05:30');
INSERT INTO public.topic_resources VALUES (205, 76, 'Python Modules', 'https://www.digitalocean.com/community/tutorials/python-modules', 'article', true, '', 2, '2025-07-16 21:24:03.289405+05:30');
INSERT INTO public.topic_resources VALUES (206, 76, 'Python - Built-In Modules', 'https://www.knowledgehut.com/tutorials/python-tutorial/python-built-in-modules', 'article', true, '', 3, '2025-07-16 21:24:22.649514+05:30');
INSERT INTO public.topic_resources VALUES (207, 77, 'Python Modules', 'https://docs.python.org/3/tutorial/modules.html', 'official', true, '', 1, '2025-07-16 21:24:46.402484+05:30');
INSERT INTO public.topic_resources VALUES (208, 77, 'Modules in Python', 'https://www.programiz.com/python-programming/modules', 'article', true, '', 2, '2025-07-16 21:24:59.386206+05:30');
INSERT INTO public.topic_resources VALUES (209, 77, 'Python Modules and Packages', 'https://realpython.com/python-modules-packages/', 'article', true, '', 3, '2025-07-16 21:25:10.7666+05:30');
INSERT INTO public.topic_resources VALUES (210, 78, 'How to use Lambda functions', 'https://realpython.com/python-lambda/', 'article', true, '', 1, '2025-07-16 21:25:35.73062+05:30');
INSERT INTO public.topic_resources VALUES (211, 78, 'Python Lambda Functions', 'https://www.youtube.com/watch?v=KR22jigJLok', 'video', true, '', 2, '2025-07-16 21:25:48.133493+05:30');
INSERT INTO public.topic_resources VALUES (212, 79, 'Learn Decorators in Python', 'https://pythonbasics.org/decorators/', 'article', true, '', 1, '2025-07-16 21:26:10.562642+05:30');
INSERT INTO public.topic_resources VALUES (213, 79, 'Python Decorators', 'https://www.datacamp.com/tutorial/decorators-python', 'article', true, '', 2, '2025-07-16 21:26:23.482055+05:30');
INSERT INTO public.topic_resources VALUES (214, 79, 'Decorators in Python', 'https://www.youtube.com/watch?v=FXUUSfJO_J4', 'video', true, '', 3, '2025-07-16 21:26:38.061433+05:30');
INSERT INTO public.topic_resources VALUES (215, 79, 'Python Decorators in 1 Minute', 'https://www.youtube.com/watch?v=BE-L7xu8pO4', 'video', true, '', 4, '2025-07-16 21:26:50.241138+05:30');
INSERT INTO public.topic_resources VALUES (216, 80, 'Python Iterators', 'https://www.programiz.com/python-programming/iterator', 'article', true, '', 1, '2025-07-16 21:27:11.500443+05:30');
INSERT INTO public.topic_resources VALUES (217, 80, 'Iterators and Iterables in Python', 'https://realpython.com/python-iterators-iterables/', 'article', true, '', 2, '2025-07-16 21:27:24.077166+05:30');
INSERT INTO public.topic_resources VALUES (218, 81, 'Regular Expressions in Python', 'https://docs.python.org/3/library/re.html', 'official', true, '', 1, '2025-07-16 21:27:44.267006+05:30');
INSERT INTO public.topic_resources VALUES (219, 81, 'Python Regular Expressions', 'https://developers.google.com/edu/python/regular-expressions', 'article', true, '', 2, '2025-07-16 21:27:55.934837+05:30');
INSERT INTO public.topic_resources VALUES (220, 81, 'Python - Regular Expressions', 'https://www.tutorialspoint.com/python/python_reg_expressions.htm', 'article', true, '', 3, '2025-07-16 21:28:17.147163+05:30');


--
-- TOC entry 5068 (class 0 OID 16552)
-- Dependencies: 235
-- Data for Name: user_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5069 (class 0 OID 16572)
-- Dependencies: 236
-- Data for Name: user_bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5071 (class 0 OID 16589)
-- Dependencies: 238
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5054 (class 0 OID 16410)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (4, 'saishchodankar1902@gmail.com', 'SC1902', 'Saish Chodankar', '$2b$12$BgnLEuhvnncd4QPsA8opXe1/b6fnnU07iG8wGT4zcdiTdzDGRxlxG', true, false, '2025-07-14 19:50:59.962898+05:30', NULL);
INSERT INTO public.users VALUES (2, 'saanvigude04@gmail.com', 'SSG', 'Saanvi Gude', '$2b$12$72cR6nO84pdhhEgKqxidFOLNhdREcLPIlesNFLPg7GsJOqze.v6nW', true, true, '2025-07-14 19:46:45.349818+05:30', '2025-07-14 19:53:20.120226+05:30');
INSERT INTO public.users VALUES (3, 'rohitbinoj@gmail.com', 'RB', 'Rohit Binoj', '$2b$12$jX4IJnvZB1l/SqLp.0Ftie4wbQ0wVQRqFns1m8Qoc/JOTWW9B0RFG', true, true, '2025-07-14 19:49:46.648794+05:30', '2025-07-14 19:53:43.950088+05:30');
INSERT INTO public.users VALUES (1, 'admin@example.com', 'Admin', 'Admin User', '$2b$12$CUmjkuGTROVw1umWvzcFiutxmisShfO.LDDIgXEZQE3mDLlS9RwwS', true, true, '2025-07-14 19:42:37.840649+05:30', '2025-07-14 19:53:59.731496+05:30');


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 226
-- Name: roadmap_topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roadmap_topics_id_seq', 81, true);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 222
-- Name: roadmaps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roadmaps_id_seq', 3, true);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 218
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_id_seq', 3, true);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 228
-- Name: team_invitations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_invitations_id_seq', 1, true);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 232
-- Name: team_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_skills_id_seq', 3, true);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 224
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_id_seq', 1, true);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 239
-- Name: topic_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_progress_id_seq', 1, false);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 241
-- Name: topic_resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_resources_id_seq', 220, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 234
-- Name: user_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_activities_id_seq', 1, false);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_progress_id_seq', 1, false);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


-- Completed on 2025-07-16 22:03:28

--
-- PostgreSQL database dump complete
--

SET session_replication_role = DEFAULT;

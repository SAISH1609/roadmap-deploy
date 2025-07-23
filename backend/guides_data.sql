--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.13

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
-- Data for Name: guides; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (9, 'Top 30 JavaScript Interview Questions and Answers', 'JavaScript interview preparation', true, 9, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Question', 'https://roadmap.sh/questions/javascript');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (8, 'TypeScript vs JavaScript: Which to Choose For Your Project', 'Choosing between TypeScript and JavaScript', true, 8, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/javascript/vs-typescript');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (7, 'Data Analyst Career Path: My Pro Advice', 'Professional guidance for data analyst career', true, 7, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/data-analyst/career-path');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (6, 'Top 30 SQL Interview Questions and Answers (With Quiz)', 'SQL interview preparation with quiz', true, 6, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Question', 'https://roadmap.sh/questions/sql');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (5, '30 SQL Queries Interview Questions and Answers', 'Essential SQL interview questions', true, 5, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Question', 'https://roadmap.sh/questions/sql-queries');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (4, 'SQL vs. MySQL: What''s the Difference?', 'Understanding the difference between SQL and MySQL', true, 4, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/sql/vs-mysql');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (3, 'SQL vs. Python: Which should you learn for data analysis?', 'Comparison of SQL and Python for data analysis', true, 3, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/sql/vs-python');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (2, 'How Long Does It Take to Learn SQL? (An Expert''s Take)', 'Timeline for mastering SQL', true, 2, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/sql/how-long-to-learn');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (1, 'Is SQL Hard to Learn? (An Expert''s Take)', 'Expert insights on learning SQL', true, 1, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/sql/hard-to-learn');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (11, '50 Popular Golang Interview Questions (+ Quiz!)', 'Golang interview questions with quiz', true, 11, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Question', 'https://roadmap.sh/questions/golang');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (14, '50 Popular Backend Developer Interview Questions and Answers', 'Backend developer interview preparation', true, 14, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:05:02.871834+00', 'Question', 'https://roadmap.sh/questions/backend');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (13, 'Top 50 Full Stack Developer Interview Questions', 'Full stack developer interview preparation', true, 13, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:05:02.871834+00', 'Question', 'https://roadmap.sh/questions/full-stack');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (12, '50 Popular Data Analyst Interview Questions (+ Quiz!)', 'Data analyst interview preparation', true, 12, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:05:02.871834+00', 'Question', 'https://roadmap.sh/questions/data-analyst');
INSERT INTO public.guides (id, title, description, is_active, order_index, created_at, updated_at, type, link) VALUES (10, 'How to Become a Data Analyst with No Experience: My Advice', 'Starting a data analyst career from scratch', true, 10, '2025-07-22 13:11:32.155441+00', '2025-07-23 06:04:51.510021+00', 'Textual', 'https://roadmap.sh/data-analyst/how-to-become');


--
-- Name: guides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guides_id_seq', 19, true);


--
-- PostgreSQL database dump complete
--


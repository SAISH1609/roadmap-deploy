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
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (8, 'Advanced JavaScript Concepts', '15 Minutes', 'https://youtube.com/watch?v=example', 'Deep dive into advanced JavaScript topics', true, '2025-07-22 13:16:36.816807+00', '2025-07-23 06:03:23.631615+00', 8);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (7, 'Tree Data Structure', '8 Minutes', 'https://www.youtube.com/watch?v=S2W3SXGPVyU', 'Tree data structure fundamentals', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:23.631615+00', 7);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (6, 'Heap Data Structure', '11 Minutes', 'https://www.youtube.com/watch?v=F_r0sJ1RqWk', 'Learning heap data structure', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:23.631615+00', 6);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (5, 'Graph Data Structure', '13 Minutes', 'https://www.youtube.com/watch?v=0sQE8zKhad0', 'Understanding graph data structures', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:23.631615+00', 5);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (4, 'Basics of Authentication', '5 Minutes', 'https://www.youtube.com/watch?v=Mcyt9SrZT6g', 'Authentication concepts and principles', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:23.631615+00', 4);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (3, 'Basic Authentication', '5 Minutes', 'https://www.youtube.com/watch?v=mwccHwUn7Gc&t=3s', 'Fundamentals of basic authentication', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:23.631615+00', 3);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (2, 'Session Based Authentication', '2 Minutes', 'https://www.youtube.com/watch?v=gKkBEOq_shs', 'Understanding session-based authentication', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:23.631615+00', 2);
INSERT INTO public.videos (id, title, duration, link, description, is_active, created_at, updated_at, order_index) VALUES (1, 'The Ultimate Frontend Developer Roadmap', '10 Minutes', 'https://www.youtube.com/watch?v=w3nt4k2jZUo&t=1s', 'Complete guide to frontend development', true, '2025-07-22 13:11:32.161293+00', '2025-07-23 06:03:08.601861+00', 1);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 12, true);


--
-- PostgreSQL database dump complete
--


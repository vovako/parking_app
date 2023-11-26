--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

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
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounttelegram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounttelegram (
    id_account integer NOT NULL,
    chat_id bigint NOT NULL,
    first_name character varying DEFAULT ''::character varying,
    last_name character varying DEFAULT ''::character varying,
    username character varying DEFAULT '@'::character varying
);


ALTER TABLE public.accounttelegram OWNER TO postgres;

--
-- Name: accounttelegram_id_account_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounttelegram_id_account_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounttelegram_id_account_seq OWNER TO postgres;

--
-- Name: accounttelegram_id_account_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounttelegram_id_account_seq OWNED BY public.accounttelegram.id_account;


--
-- Name: appuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appuser (
    id_user integer NOT NULL,
    pass character varying NOT NULL,
    phone character varying NOT NULL,
    is_invalid boolean DEFAULT false,
    telegram integer DEFAULT 0
);


ALTER TABLE public.appuser OWNER TO postgres;

--
-- Name: appuser_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appuser_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appuser_id_user_seq OWNER TO postgres;

--
-- Name: appuser_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appuser_id_user_seq OWNED BY public.appuser.id_user;


--
-- Name: arend; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arend (
    id_arend integer NOT NULL,
    id_user integer NOT NULL,
    id_price integer NOT NULL,
    id_method integer NOT NULL,
    payment_on_spot boolean DEFAULT false,
    time_start_arend timestamp without time zone NOT NULL,
    time_end_arend timestamp without time zone NOT NULL,
    payyed boolean DEFAULT false,
    sum character varying
);


ALTER TABLE public.arend OWNER TO postgres;

--
-- Name: arend_id_arend_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arend_id_arend_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.arend_id_arend_seq OWNER TO postgres;

--
-- Name: arend_id_arend_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arend_id_arend_seq OWNED BY public.arend.id_arend;


--
-- Name: arend_id_method_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arend_id_method_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.arend_id_method_seq OWNER TO postgres;

--
-- Name: arend_id_method_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arend_id_method_seq OWNED BY public.arend.id_method;


--
-- Name: arend_id_price_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arend_id_price_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.arend_id_price_seq OWNER TO postgres;

--
-- Name: arend_id_price_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arend_id_price_seq OWNED BY public.arend.id_price;


--
-- Name: arend_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arend_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.arend_id_user_seq OWNER TO postgres;

--
-- Name: arend_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arend_id_user_seq OWNED BY public.arend.id_user;


--
-- Name: hourswork; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hourswork (
    id integer NOT NULL,
    id_parking integer NOT NULL,
    days character varying DEFAULT ''::character varying,
    time_start timestamp without time zone NOT NULL,
    time_end timestamp without time zone NOT NULL
);


ALTER TABLE public.hourswork OWNER TO postgres;

--
-- Name: hourswork_id_parking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hourswork_id_parking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hourswork_id_parking_seq OWNER TO postgres;

--
-- Name: hourswork_id_parking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hourswork_id_parking_seq OWNED BY public.hourswork.id_parking;


--
-- Name: hourswork_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hourswork_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hourswork_id_seq OWNER TO postgres;

--
-- Name: hourswork_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hourswork_id_seq OWNED BY public.hourswork.id;


--
-- Name: ownerpark; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ownerpark (
    id_owner integer NOT NULL,
    pass character varying NOT NULL,
    phone character varying NOT NULL,
    telegram integer DEFAULT 0
);


ALTER TABLE public.ownerpark OWNER TO postgres;

--
-- Name: ownerpark_id_owner_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ownerpark_id_owner_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ownerpark_id_owner_seq OWNER TO postgres;

--
-- Name: ownerpark_id_owner_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ownerpark_id_owner_seq OWNED BY public.ownerpark.id_owner;


--
-- Name: parking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking (
    id_parking integer NOT NULL,
    lat character varying NOT NULL,
    long character varying NOT NULL,
    location public.geometry(Point,4326) NOT NULL,
    has_cam boolean DEFAULT false,
    id_type integer,
    id_owner integer NOT NULL,
    title character varying DEFAULT 'Название парковки'::character varying,
    address character varying DEFAULT 'ул. Лесная, дом 20'::character varying,
    is_guard boolean DEFAULT false
);


ALTER TABLE public.parking OWNER TO postgres;

--
-- Name: parking_id_owner_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_id_owner_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_id_owner_seq OWNER TO postgres;

--
-- Name: parking_id_owner_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_id_owner_seq OWNED BY public.parking.id_owner;


--
-- Name: parking_id_parking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_id_parking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_id_parking_seq OWNER TO postgres;

--
-- Name: parking_id_parking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_id_parking_seq OWNED BY public.parking.id_parking;


--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_methods (
    id_method integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.payment_methods OWNER TO postgres;

--
-- Name: price; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.price (
    id_price integer NOT NULL,
    value integer DEFAULT 0,
    time_arend character varying DEFAULT 'day'::character varying,
    id_parking integer NOT NULL
);


ALTER TABLE public.price OWNER TO postgres;

--
-- Name: price_id_parking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.price_id_parking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_id_parking_seq OWNER TO postgres;

--
-- Name: price_id_parking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.price_id_parking_seq OWNED BY public.price.id_parking;


--
-- Name: price_id_price_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.price_id_price_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_id_price_seq OWNER TO postgres;

--
-- Name: price_id_price_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.price_id_price_seq OWNED BY public.price.id_price;


--
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report (
    id_report integer NOT NULL,
    description character varying NOT NULL,
    image character varying DEFAULT ''::character varying,
    reporter character varying NOT NULL,
    id_parking integer NOT NULL
);


ALTER TABLE public.report OWNER TO postgres;

--
-- Name: report_id_parking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_id_parking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_id_parking_seq OWNER TO postgres;

--
-- Name: report_id_parking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_id_parking_seq OWNED BY public.report.id_parking;


--
-- Name: report_id_report_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_id_report_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_id_report_seq OWNER TO postgres;

--
-- Name: report_id_report_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_id_report_seq OWNED BY public.report.id_report;


--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id_review integer NOT NULL,
    description character varying DEFAULT ''::character varying,
    rate integer DEFAULT 1,
    date_review timestamp without time zone DEFAULT now(),
    id_parking integer NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: review_id_parking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_parking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_id_parking_seq OWNER TO postgres;

--
-- Name: review_id_parking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_parking_seq OWNED BY public.review.id_parking;


--
-- Name: review_id_review_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_review_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_id_review_seq OWNER TO postgres;

--
-- Name: review_id_review_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_review_seq OWNED BY public.review.id_review;


--
-- Name: review_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_id_user_seq OWNER TO postgres;

--
-- Name: review_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_user_seq OWNED BY public.review.id_user;


--
-- Name: spot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spot (
    id_spot integer NOT NULL,
    id_parking integer NOT NULL,
    descr character varying NOT NULL,
    is_invalid boolean DEFAULT false,
    is_available boolean DEFAULT true,
    is_blocked boolean DEFAULT false
);


ALTER TABLE public.spot OWNER TO postgres;

--
-- Name: spot_id_parking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spot_id_parking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spot_id_parking_seq OWNER TO postgres;

--
-- Name: spot_id_parking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spot_id_parking_seq OWNED BY public.spot.id_parking;


--
-- Name: spot_id_spot_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spot_id_spot_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spot_id_spot_seq OWNER TO postgres;

--
-- Name: spot_id_spot_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spot_id_spot_seq OWNED BY public.spot.id_spot;


--
-- Name: type_parking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_parking (
    id_type integer NOT NULL,
    title character varying
);


ALTER TABLE public.type_parking OWNER TO postgres;

--
-- Name: accounttelegram id_account; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounttelegram ALTER COLUMN id_account SET DEFAULT nextval('public.accounttelegram_id_account_seq'::regclass);


--
-- Name: appuser id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appuser ALTER COLUMN id_user SET DEFAULT nextval('public.appuser_id_user_seq'::regclass);


--
-- Name: arend id_arend; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend ALTER COLUMN id_arend SET DEFAULT nextval('public.arend_id_arend_seq'::regclass);


--
-- Name: arend id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend ALTER COLUMN id_user SET DEFAULT nextval('public.arend_id_user_seq'::regclass);


--
-- Name: arend id_price; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend ALTER COLUMN id_price SET DEFAULT nextval('public.arend_id_price_seq'::regclass);


--
-- Name: arend id_method; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend ALTER COLUMN id_method SET DEFAULT nextval('public.arend_id_method_seq'::regclass);


--
-- Name: hourswork id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hourswork ALTER COLUMN id SET DEFAULT nextval('public.hourswork_id_seq'::regclass);


--
-- Name: hourswork id_parking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hourswork ALTER COLUMN id_parking SET DEFAULT nextval('public.hourswork_id_parking_seq'::regclass);


--
-- Name: ownerpark id_owner; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ownerpark ALTER COLUMN id_owner SET DEFAULT nextval('public.ownerpark_id_owner_seq'::regclass);


--
-- Name: parking id_parking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking ALTER COLUMN id_parking SET DEFAULT nextval('public.parking_id_parking_seq'::regclass);


--
-- Name: parking id_owner; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking ALTER COLUMN id_owner SET DEFAULT nextval('public.parking_id_owner_seq'::regclass);


--
-- Name: price id_price; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price ALTER COLUMN id_price SET DEFAULT nextval('public.price_id_price_seq'::regclass);


--
-- Name: price id_parking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price ALTER COLUMN id_parking SET DEFAULT nextval('public.price_id_parking_seq'::regclass);


--
-- Name: report id_report; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report ALTER COLUMN id_report SET DEFAULT nextval('public.report_id_report_seq'::regclass);


--
-- Name: report id_parking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report ALTER COLUMN id_parking SET DEFAULT nextval('public.report_id_parking_seq'::regclass);


--
-- Name: review id_review; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id_review SET DEFAULT nextval('public.review_id_review_seq'::regclass);


--
-- Name: review id_parking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id_parking SET DEFAULT nextval('public.review_id_parking_seq'::regclass);


--
-- Name: review id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id_user SET DEFAULT nextval('public.review_id_user_seq'::regclass);


--
-- Name: spot id_spot; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot ALTER COLUMN id_spot SET DEFAULT nextval('public.spot_id_spot_seq'::regclass);


--
-- Name: spot id_parking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot ALTER COLUMN id_parking SET DEFAULT nextval('public.spot_id_parking_seq'::regclass);


--
-- Data for Name: accounttelegram; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounttelegram (id_account, chat_id, first_name, last_name, username) FROM stdin;
1	5507902289	Mark	ll	strivll
\.


--
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appuser (id_user, pass, phone, is_invalid, telegram) FROM stdin;
1	12345	89871911240	f	0
\.


--
-- Data for Name: arend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arend (id_arend, id_user, id_price, id_method, payment_on_spot, time_start_arend, time_end_arend, payyed, sum) FROM stdin;
\.


--
-- Data for Name: hourswork; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hourswork (id, id_parking, days, time_start, time_end) FROM stdin;
\.


--
-- Data for Name: ownerpark; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ownerpark (id_owner, pass, phone, telegram) FROM stdin;
1	123	89871910893	0
4	12345	89871911241	0
3	12345	89871911240	1
2	s#vEltE18.	+79198535380	1
\.


--
-- Data for Name: parking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking (id_parking, lat, long, location, has_cam, id_type, id_owner, title, address, is_guard) FROM stdin;
6	40.7128	74.0060	0101000020E61000005E4BC8073D5B4440AAF1D24D62805240	t	1	1	Название парковки	ул. Лесная, дом 20	f
7	34.0522	118.2437	0101000020E6100000F46C567DAE0641404182E2C7988F5D40	f	2	1	Название парковки	ул. Лесная, дом 20	f
8	41.8781	87.6298	0101000020E61000000E4FAF9465F0444055C1A8A44EE85540	t	1	1	Название парковки	ул. Лесная, дом 20	f
9	51.5074	0.1278	0101000020E6100000C5FEB27BF2C04940EBE2361AC05BC03F	f	2	1	Название парковки	ул. Лесная, дом 20	f
10	35.6895	139.6917	0101000020E6100000C74B378941D8414095D4096822766140	t	1	1	Название парковки	ул. Лесная, дом 20	f
11	51.77704	55.08529	0101000020E610000088D7F50B76E34940825660C8EA8A4B40	t	3	2	Название парковки	ул. Лесная, дом 20	f
12	51.79225	55.12378	0101000020E6100000C520B07268E549400EF3E505D88F4B40	f	1	1	Название парковки	ул. Лесная, дом 20	f
13	51.78826	55.12811	0101000020E61000005B5F24B4E5E44940312592E865904B40	t	3	2	Название парковки	ул. Лесная, дом 20	f
14	51.78869	55.12283	0101000020E610000054573ECBF3E44940DD7BB8E4B88F4B40	f	2	2	Название парковки	ул. Лесная, дом 20	f
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_methods (id_method, title) FROM stdin;
1	Наличный расчет
2	Безналичный расчет
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.price (id_price, value, time_arend, id_parking) FROM stdin;
1	120	час	11
2	360	час	11
3	1300	час	14
4	200	час	6
5	1500	час	7
\.


--
-- Data for Name: report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report (id_report, description, image, reporter, id_parking) FROM stdin;
1	Пожар	ec2630c5-4aa9-42bb-a6c4-a468798bee7f	Mark Zagumennikov @Izumrak	13
2	Описание		Mark Zagumennikov @Izumrak	13
3	Описание		Mark Zagumennikov @Izumrak	13
4	Описание	23ec624b-256b-4ce4-bf29-2c971b046647	Mark Zagumennikov @Izumrak	13
5	Проблема жуткая	d3851506-d6da-4032-9c23-98b66294dce6	Mark Zagumennikov @Izumrak	13
6	Взломали машину		Mark Zagumennikov @Izumrak	13
7	Авария	10e89720-1c25-451c-a9b8-fbbb9432f0b2	Mark ll @strivll	13
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id_review, description, rate, date_review, id_parking, id_user) FROM stdin;
1		1	2023-11-25 22:11:11.184553	11	1
2	Хорошая парковка, оставил на ночь, утром вижу на кирпичах без колес	5	2023-11-25 22:14:01.841822	11	1
3	Хорошая парковка, оставил на ночь, утром вижу на кирпичах без колес	5	2023-11-26 13:13:05.191952	11	1
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: spot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spot (id_spot, id_parking, descr, is_invalid, is_available, is_blocked) FROM stdin;
1	11	A1	f	t	f
2	11	A2	f	t	f
3	11	B3	f	t	f
4	11	C1	f	t	f
5	13	C2	f	t	f
6	13	C3	f	t	f
\.


--
-- Data for Name: type_parking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_parking (id_type, title) FROM stdin;
1	Открытая
2	Крытая
3	Многоуровневая
\.


--
-- Name: accounttelegram_id_account_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounttelegram_id_account_seq', 1, true);


--
-- Name: appuser_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appuser_id_user_seq', 1, true);


--
-- Name: arend_id_arend_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arend_id_arend_seq', 5, true);


--
-- Name: arend_id_method_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arend_id_method_seq', 1, false);


--
-- Name: arend_id_price_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arend_id_price_seq', 1, false);


--
-- Name: arend_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arend_id_user_seq', 1, false);


--
-- Name: hourswork_id_parking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hourswork_id_parking_seq', 1, false);


--
-- Name: hourswork_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hourswork_id_seq', 1, false);


--
-- Name: ownerpark_id_owner_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ownerpark_id_owner_seq', 4, true);


--
-- Name: parking_id_owner_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_id_owner_seq', 1, false);


--
-- Name: parking_id_parking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_id_parking_seq', 14, true);


--
-- Name: price_id_parking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.price_id_parking_seq', 1, false);


--
-- Name: price_id_price_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.price_id_price_seq', 5, true);


--
-- Name: report_id_parking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_id_parking_seq', 1, false);


--
-- Name: report_id_report_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_id_report_seq', 7, true);


--
-- Name: review_id_parking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_parking_seq', 1, false);


--
-- Name: review_id_review_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_review_seq', 3, true);


--
-- Name: review_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_user_seq', 1, false);


--
-- Name: spot_id_parking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.spot_id_parking_seq', 1, false);


--
-- Name: spot_id_spot_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.spot_id_spot_seq', 6, true);


--
-- Name: accounttelegram accounttelegram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounttelegram
    ADD CONSTRAINT accounttelegram_pkey PRIMARY KEY (id_account);


--
-- Name: appuser appuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT appuser_pkey PRIMARY KEY (id_user);


--
-- Name: arend arend_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend
    ADD CONSTRAINT arend_pkey PRIMARY KEY (id_arend);


--
-- Name: hourswork hourswork_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hourswork
    ADD CONSTRAINT hourswork_pkey PRIMARY KEY (id);


--
-- Name: ownerpark ownerpark_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ownerpark
    ADD CONSTRAINT ownerpark_pkey PRIMARY KEY (id_owner);


--
-- Name: parking parking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_pkey PRIMARY KEY (id_parking);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id_method);


--
-- Name: price price_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_pkey PRIMARY KEY (id_price);


--
-- Name: report report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id_report);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id_review);


--
-- Name: spot spot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot
    ADD CONSTRAINT spot_pkey PRIMARY KEY (id_spot);


--
-- Name: type_parking type_parking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_parking
    ADD CONSTRAINT type_parking_pkey PRIMARY KEY (id_type);


--
-- Name: idx_location; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_location ON public.parking USING gist (location);


--
-- Name: arend arend_id_method_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend
    ADD CONSTRAINT arend_id_method_fkey FOREIGN KEY (id_method) REFERENCES public.payment_methods(id_method);


--
-- Name: arend arend_id_price_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend
    ADD CONSTRAINT arend_id_price_fkey FOREIGN KEY (id_price) REFERENCES public.price(id_price);


--
-- Name: arend arend_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arend
    ADD CONSTRAINT arend_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.appuser(id_user);


--
-- Name: hourswork hourswork_id_parking_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hourswork
    ADD CONSTRAINT hourswork_id_parking_fkey FOREIGN KEY (id_parking) REFERENCES public.parking(id_parking);


--
-- Name: parking parking_id_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_id_owner_fkey FOREIGN KEY (id_owner) REFERENCES public.ownerpark(id_owner);


--
-- Name: parking parking_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.type_parking(id_type);


--
-- Name: price price_id_parking_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_id_parking_fkey FOREIGN KEY (id_parking) REFERENCES public.parking(id_parking);


--
-- Name: report report_id_parking_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_id_parking_fkey FOREIGN KEY (id_parking) REFERENCES public.parking(id_parking);


--
-- Name: review review_id_parking_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_id_parking_fkey FOREIGN KEY (id_parking) REFERENCES public.parking(id_parking);


--
-- Name: review review_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.appuser(id_user);


--
-- Name: spot spot_id_parking_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot
    ADD CONSTRAINT spot_id_parking_fkey FOREIGN KEY (id_parking) REFERENCES public.parking(id_parking);


--
-- PostgreSQL database dump complete
--


DROP TABLE IF EXISTS kredit CASCADE;
DROP TABLE IF EXISTS tip_racuna CASCADE;
DROP TABLE IF EXISTS klijent CASCADE;
DROP TABLE IF EXISTS racun CASCADE;

DROP SEQUENCE IF EXISTS kredit_seq;
DROP SEQUENCE IF EXISTS klijent_seq;
DROP SEQUENCE IF EXISTS racun_seq;
DROP SEQUENCE IF EXISTS tip_racuna_seq;


CREATE TABLE kredit (
    id integer not null,
    naziv varchar(100),
    oznaka varchar(20),
    opis varchar(500)
);

CREATE TABLE tip_racuna (
    id integer not null,
    naziv varchar(100),
    oznaka varchar(20),
    opis varchar(500)
);

CREATE TABLE klijent (
	id integer not null,
    ime varchar(50),
    prezime varchar(50),
    broj_lk integer,
    kredit integer not null
);

CREATE TABLE racun (
    id integer not null,
    naziv varchar(100),
    oznaka varchar(20),
    opis varchar(500),
    tip_racuna integer not null,
    klijent integer not null
);

ALTER TABLE kredit
ADD CONSTRAINT pk_kredit PRIMARY KEY (id);
ALTER TABLE tip_racuna
ADD CONSTRAINT pk_tip_racuna PRIMARY KEY (id);
ALTER TABLE klijent
ADD CONSTRAINT pk_klijent PRIMARY KEY (id);
ALTER TABLE racun
ADD CONSTRAINT pk_racun PRIMARY KEY (id);

ALTER TABLE klijent
ADD CONSTRAINT fk_klijent_kredit FOREIGN KEY (kredit)
REFERENCES kredit (id) on delete cascade;
ALTER TABLE racun
ADD CONSTRAINT fk_racun_tip_racuna FOREIGN KEY (tip_racuna)
REFERENCES tip_racuna (id) on delete cascade;
ALTER TABLE racun
ADD CONSTRAINT fk_racun_klijent FOREIGN KEY (klijent)
REFERENCES klijent (id) on delete cascade;

CREATE INDEX idx_pk_kredit ON kredit (id);
CREATE INDEX idx_pk_klijent ON klijent (id);
CREATE INDEX idx_pk_racun ON racun (id);
CREATE INDEX idx_pk_tip_racuna ON tip_racuna (id);

CREATE INDEX idx_fk_klijent_kredit ON klijent (kredit);
CREATE INDEX idx_fk_racun_klijent ON racun (klijent);
CREATE INDEX idx_pk_racun_tip_racuna ON racun (tip_racuna);

CREATE SEQUENCE IF NOT EXISTS kredit_seq INCREMENT 1 START 1;
CREATE SEQUENCE IF NOT EXISTS klijent_seq INCREMENT 1 START 1;
CREATE SEQUENCE IF NOT EXISTS racun_seq INCREMENT 1 START 1;
CREATE SEQUENCE IF NOT EXISTS tip_racuna_seq INCREMENT 1 START 1;

ALTER TABLE kredit ALTER COLUMN id SET DEFAULT nextval('kredit_seq');
ALTER TABLE klijent ALTER COLUMN id SET DEFAULT nextval('klijent_seq');
ALTER TABLE racun ALTER COLUMN id SET DEFAULT nextval('racun_seq');
ALTER TABLE tip_racuna ALTER COLUMN id SET DEFAULT nextval('tip_racuna_seq');
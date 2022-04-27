insert into kredit (id,naziv,oznaka,opis)
values (-100,'Kredit za testiranje','TK','Kredit namenjen za testiranje aplikacije');
insert into klijent(id,ime,prezime,broj_lk,kredit)
values (-100,'Petar','Petrovic','0551418',-100);
insert into tip_racuna (id,naziv,oznaka,opis)
values (-100,'Tekuci racun','TT','Racun za testiranje');
insert into racun (id,naziv,oznaka,opis,tip_racuna,klijent)
values (-100,'Racun br.2584','R2584','Kreditni racun',-100,-100);
-- Kredit podaci

insert into kredit (id,naziv,oznaka,opis)
values (nextval('kredit_seq'),'Studentski kredit','SK','Kredit namenjen studentima'),
(nextval('kredit_seq'),'Penzionerski kredit','PK','Kredit s posebnim pogodnostima za penzionere'),
(nextval('kredit_seq'),'Kredit za auto','AK','Kredit s posebnim pogodnostima prilikom kupovine automobila'),
(nextval('kredit_seq'),'Stambeni kredit','SK','Kredit s posebnim pogodnostima prilikom kupovine stambenog objekta'),
(nextval('kredit_seq'),'DInarski kredit','DK','Kredit ciji se iznos i mesecne obaveze izrazavaju u dinarima');

insert into klijent (id,ime,prezime,broj_lk,kredit)
values (nextval('klijent_seq'),'Sasa','Ilic','0551418','1'),
(nextval('klijent_seq'),'Vukasin','Stanisic','0854858','2'),
(nextval('klijent_seq'),'Marko','Rakic','20051858','5'),
(nextval('klijent_seq'),'Enio','Kurtesi','85252585','4'),
(nextval('klijent_seq'),'Dragan','Rankov','185841285','3');

insert into tip_racuna (id,naziv,oznaka,opis)
values (nextval('tip_racuna_seq'),'Tekuci racun','TR','Tekuci racun za korisnika'),
(nextval('tip_racuna_seq'),'Ziro racun','ZR','Ziro racun za korisnika'),
(nextval('tip_racuna_seq'),'Namenski racun','NR','Namenski racun za korisnika'),
(nextval('tip_racuna_seq'),'Devizni racun','DR','Devizni racun za korisnika'),
(nextval('tip_racuna_seq'),'Stedni racun','SR','Stedni racun za korisnika');

insert into racun (id,naziv,oznaka,opis,tip_racuna,klijent)
values (nextval('racun_seq'),'Racun br.2584','R2584','Kreditni racun','1','1'),
(nextval('racun_seq'),'Racun br.2585','R2585','Kreditni racun','2','2'),
(nextval('racun_seq'),'Racun br.2586','R2586','Kreditni racun','3','3'),
(nextval('racun_seq'),'Racun br.2587','R2587','Kreditni racun','4','4'),
(nextval('racun_seq'),'Racun br.2588','R2588','Kreditni racun','5','5');
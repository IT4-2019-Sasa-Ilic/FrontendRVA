package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Klijent;
import rva.jpa.Racun;
import rva.jpa.TipRacuna;
import rva.repositories.KlijentRepository;
import rva.repositories.RacunRepository;
import rva.repositories.TipRacunaRepository;

@CrossOrigin
@Api(tags = ("Račun CRUD operacije"))
@RestController
public class RacunRestController {

	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private TipRacunaRepository tipRacunaRepository;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value="Vraća kolekciju svih računa iz baze podataka")
	@GetMapping("racun")
	public Collection<Racun> getRacuni() {
		
		return racunRepository.findAll();
	}
	
	@ApiOperation(value="Vraća konkretan račun na osnovu prosleđenog ID")
	@SuppressWarnings("deprecation")
	@GetMapping("racun/{id}")
	public Racun getRacun(@PathVariable("id") Integer id) {
		
		return racunRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju kredita na osnovu prosleđenog naziva računa")
	@GetMapping("racunNaziv/{naziv}")
	public Collection<Racun> getRacunByNaziv(@PathVariable("naziv") String naziv) {
		return racunRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value="Vraća kolekciju kredita na osnovu prosleđenog ID-a tipa računa")
	@GetMapping("racunTipRacuna/{id}")
	public Collection<Racun> getRacunByTipRacuna(@PathVariable("id") Integer id) {
		TipRacuna tipRacuna = tipRacunaRepository.getOne(id);
		return racunRepository.findBytipRacuna(tipRacuna);
	}
	
	@ApiOperation(value="Vraća kolekciju kredita na osnovu prosleđenog ID-a klijenta")
	@GetMapping("racunByKlijent/{id}")
	public Collection<Racun> getRacunByKlijent(@PathVariable("id") Integer id) {
		Klijent klijent =  klijentRepository.getOne(id);
		return racunRepository.findByklijent(klijent);
		
	}
	
	@ApiOperation(value="Dodaje novi račun u bazu podataka")
	@PostMapping("racun")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);	
	}
	
	@ApiOperation(value="Update-uje račun iz baze podataka")
	@PutMapping("racun")
	public ResponseEntity<Racun> updateRacun(@RequestBody  Racun racun) {
		if(racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value="Briše račun iz baze podataka na osnovu prosleđenog ID")
	@DeleteMapping("racun/{id}")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id) {
		if(racunRepository.existsById(id)) {
			racunRepository.deleteById(id);
			if(id == -100) {
				
				jdbcTemplate.execute("insert into racun (id,naziv,oznaka,opis,tip_racuna,klijent) values (-100,'Racun br.2584','R2584','Kreditni racun',-100,-100);");

			}
			
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
	}
}

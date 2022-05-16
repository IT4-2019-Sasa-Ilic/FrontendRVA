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
import rva.repositories.KlijentRepository;

@CrossOrigin
@Api(tags = ("Klijent CRUD operacije"))
@RestController
public class KlijentRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@ApiOperation(value="Vraća kolekciju svih klijenata iz baze podataka")
	@GetMapping("klijent")
	public Collection<Klijent> getKlijenti() {
		
		return klijentRepository.findAll();
	}
	
	@ApiOperation(value="Vraća konkretnog klijenta na osnovu prosleđenog ID")
	@SuppressWarnings("deprecation")
	@GetMapping("klijent/{id}")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		
		return klijentRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju klijenata na osnovu prosleđenog imena klijenta")
	@GetMapping("klijentIme/{ime}")
	public Collection<Klijent> getKlijentByIme(@PathVariable("ime") String ime) {
		return klijentRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@ApiOperation(value="Dodaje novog klijenta u bazu podataka")
	@PostMapping("klijent")
	public ResponseEntity<Klijent> insertKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId())) {
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		return new ResponseEntity<Klijent>(HttpStatus.CONFLICT);	
	}
	
	@ApiOperation(value="Update-uje klijenta iz baze podataka")
	@PutMapping("klijent")
	public ResponseEntity<Klijent> updateKlijent(@RequestBody Klijent klijent) {
		if(klijentRepository.existsById(klijent.getId())) {
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value="Briše klijenta iz baze podataka na osnovu prosleđenog ID")
	@DeleteMapping("klijent/{id}")
	public ResponseEntity<Klijent> deleteKlijent(@PathVariable("id") Integer id) {
		if(klijentRepository.existsById(id)) {
			klijentRepository.deleteById(id);
			if(id == -100) {
				
				jdbcTemplate.execute("insert into klijent(id,ime,prezime,broj_lk,kredit) values (-100,'Petar','Petrovic','0551418',-100)");
				jdbcTemplate.execute("insert into racun (id,naziv,oznaka,opis,tip_racuna,klijent) values (-100,'Racun br.2584','R2584','Kreditni racun',-100,-100);");
			}
			
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);
	}

}
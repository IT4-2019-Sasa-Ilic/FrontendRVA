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
import rva.jpa.Kredit;
import rva.repositories.KreditRepository;

@CrossOrigin
@Api(tags = ("Kredit CRUD operacije"))
@RestController
public class KreditRestController {

	@Autowired
	private KreditRepository kreditRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value="Vraća kolekciju svih kredita iz baze podataka")
	@GetMapping("kredit")
	public Collection<Kredit> getKrediti() {
		
		return kreditRepository.findAll();
	}
	
	@ApiOperation(value="Vraća konkretan kredit na osnovu prosleđenog ID")
	@SuppressWarnings("deprecation")
	@GetMapping("kredit/{id}")
	public Kredit getKredit(@PathVariable("id") Integer id) {
		
		return kreditRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju kredita na osnovu prosleđenog naziva kredita")
	@GetMapping("kreditNaziv/{naziv}")
	public Collection<Kredit> getKreditByIme(@PathVariable("naziv") String naziv) {
		return kreditRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value="Dodaje novi kredit u bazu podataka")
	@PostMapping("kredit")
	public ResponseEntity<Kredit> insertKredit(@RequestBody Kredit kredit) {
		if(!kreditRepository.existsById(kredit.getId())) {
			kreditRepository.save(kredit);
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		}
		return new ResponseEntity<Kredit>(HttpStatus.CONFLICT);	
	}
	
	@ApiOperation(value="Update-uje kredit iz baze podataka")
	@PutMapping("kredit")
	public ResponseEntity<Kredit> updateKredit(@RequestBody  Kredit kredit) {
		if(kreditRepository.existsById(kredit.getId())) {
			kreditRepository.save(kredit);
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		}
		return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value="Briše kredit iz baze podataka na osnovu prosleđenog ID")
	@DeleteMapping("kredit/{id}")
	public ResponseEntity<Kredit> deleteKredit(@PathVariable("id") Integer id) {
		if(kreditRepository.existsById(id)) {
			kreditRepository.deleteById(id);
			if(id == -100) {
				
				jdbcTemplate.execute("insert into kredit (id,naziv,oznaka,opis) values (-100,'Kredit za testiranje','TK','Kredit namenjen za testiranje aplikacije')");
				jdbcTemplate.execute("insert into klijent(id,ime,prezime,broj_lk,kredit) values (-100,'Petar','Petrovic','0551418',-100)");
			}
			
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		}
		return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
	}

	
}

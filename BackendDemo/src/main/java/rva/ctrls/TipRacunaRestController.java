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
import rva.jpa.Racun;
import rva.jpa.TipRacuna;
import rva.repositories.TipRacunaRepository;

@CrossOrigin
@Api(tags = ("Tip računa CRUD operacije"))
@RestController
public class TipRacunaRestController {

	
	@Autowired
	private TipRacunaRepository tipRacunaRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value="Vraća kolekciju svih tipova računa iz baze podataka")
	@GetMapping("tipRacuna")
	public Collection<TipRacuna> getTipoviRacuna() {
		
		return tipRacunaRepository.findAll();
	}
	
	@ApiOperation(value="Vraća konkretan tip računa na osnovu prosleđenog ID")
	@SuppressWarnings("deprecation")
	@GetMapping("tipRacuna/{id}")
	public TipRacuna getTipRacuna(@PathVariable("id") Integer id) {
		
		return tipRacunaRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju tipova kredita na osnovu prosleđenog naziva tipa računa")
	@GetMapping("tipRacunaNaziv/{naziv}")
	public Collection<TipRacuna> getTipRacunByNaziv(@PathVariable("naziv") String naziv) {
		return tipRacunaRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value="Dodaje novi tip računa u bazu podataka")
	@PostMapping("tipRacuna")
	public ResponseEntity<TipRacuna> insertTipRacuna(@RequestBody TipRacuna tipRacuna) {
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			tipRacunaRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.CONFLICT);	
	}
	
	@ApiOperation(value="Update-uje tip računa iz baze podataka")
	@PutMapping("tipRacuna")
	public ResponseEntity<TipRacuna> updateTipRacuna(@RequestBody  TipRacuna tipRacuna) {
		if(tipRacunaRepository.existsById(tipRacuna.getId())) {
			tipRacunaRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value="Briše tip računa iz baze podataka na osnovu prosleđenog ID")
	@DeleteMapping("tipRacuna/{id}")
	public ResponseEntity<TipRacuna> deleteTipRacuna(@PathVariable("id") Integer id) {
		if(tipRacunaRepository.existsById(id)) {
			tipRacunaRepository.deleteById(id);
			if(id == -100) {
				
				jdbcTemplate.execute("insert into tip_racuna (id,naziv,oznaka,opis) values (-100,'Tekuci racun','TT','Racun za testiranje');");
				jdbcTemplate.execute("insert into racun (id,naziv,oznaka,opis,tip_racuna,klijent) values (-100,'Racun br.2584','R2584','Kreditni racun',-100,-100);");
			}
			
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
	}
	
}

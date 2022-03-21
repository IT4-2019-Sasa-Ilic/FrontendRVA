package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Klijent;
import rva.repositories.KlijentRepository;

@RestController
public class KlijentRestController {

	@Autowired
	private KlijentRepository klijentRepository;
	
	
	@GetMapping("klijent")
	public Collection<Klijent> getKlijenti() {
		
		return klijentRepository.findAll();
	}
	
	@SuppressWarnings("deprecation")
	@GetMapping("klijent/{id}")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		
		return klijentRepository.getOne(id);
}

}
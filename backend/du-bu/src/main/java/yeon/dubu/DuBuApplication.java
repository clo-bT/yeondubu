package yeon.dubu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import yeon.dubu.policy.service.PolicyService;

@SpringBootApplication
public class DuBuApplication implements CommandLineRunner {

	private final PolicyService policyService;

	@Autowired
	public DuBuApplication(PolicyService policyService) {
		this.policyService = policyService;
	}
	public static void main(String[] args) {
		SpringApplication.run(DuBuApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String filePath = "src/main/java/yeon/dubu/policy/data/policy.json";
		policyService.savePoliciesFromJsonFile(filePath);
	}

}

package yeon.dubu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import yeon.dubu.policy.service.PolicyService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

		boolean isDbEmpty = policyService.isDbEmpty();

		// 이전에 저장된 파일의 수정 시간 가져오기
		Path path = Paths.get(filePath);
		long previousModifiedTime = Files.getLastModifiedTime(path).toMillis();

		// 5초 대기
		Thread.sleep(5000);

		// 수정된 시간과 이전에 저장된 시간 비교하여 업데이트 여부 확인
		long currentModifiedTime = Files.getLastModifiedTime(path).toMillis();

		if (currentModifiedTime > previousModifiedTime || isDbEmpty) {
			policyService.deleteAllPolicies(); // 이전 데이터 삭제
			policyService.savePoliciesFromJsonFile(filePath);
		} else {
			System.out.println("파일이 업데이트되지 않았으므로 정책 파일을 실행하지 않습니다.");
		}
	}

}

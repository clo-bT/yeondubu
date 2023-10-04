package yeon.dubu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import yeon.dubu.policy.service.PolicyService;
import yeon.dubu.stuff.service.StuffService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class DuBuApplication implements CommandLineRunner {

	private final PolicyService policyService;
	private final StuffService stuffService;

	@Autowired
	public DuBuApplication(PolicyService policyService, StuffService stuffService) {
		this.policyService = policyService;
		this.stuffService = stuffService;
	}
	public static void main(String[] args) {
		SpringApplication.run(DuBuApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String policyFilePath = "src/main/java/yeon/dubu/policy/data/policy.json";
		String stuffFilePath = "src/main/java/yeon/dubu/stuff/data/stuff.json";

		boolean isPolicyDbEmpty = policyService.isPolicyDbEmpty();
		boolean isStuffDbEmpty = stuffService.isStuffDbEmpty();

		// 이전에 저장된 파일의 수정 시간 가져오기
		Path policyPath = Paths.get(policyFilePath);
		long previousPolicyModifiedTime = Files.getLastModifiedTime(policyPath).toMillis();
		Path stuffPath = Paths.get(stuffFilePath);
		long previousStuffModifiedTime = Files.getLastModifiedTime(stuffPath).toMillis();

		// 5초 대기
		Thread.sleep(5000);

		// 수정된 시간과 이전에 저장된 시간 비교하여 업데이트 여부 확인
		long currentPolicyModifiedTime = Files.getLastModifiedTime(policyPath).toMillis();
		long currentStuffModifiedTime = Files.getLastModifiedTime(stuffPath).toMillis();

		if (currentPolicyModifiedTime > previousPolicyModifiedTime || isPolicyDbEmpty) {
			policyService.deleteAllPolicies(); // 이전 데이터 삭제
			policyService.savePoliciesFromJsonFile(policyFilePath);
			System.out.println("정책 파일이 업데이트 되었습니다.");
		} else {
			System.out.println("파일이 업데이트되지 않았으므로 정책 파일을 실행하지 않습니다.");
		}

		if (currentStuffModifiedTime > previousStuffModifiedTime || isStuffDbEmpty) {
			stuffService.deleteAllStuffs(); // 이전 데이터 삭제
			stuffService.saveStuffsFromJsonFile(stuffFilePath);
			System.out.println("가구 추천 파일이 업데이트 되었습니다.");
		} else {
			System.out.println("파일이 업데이트되지 않았으므로 가구 추천 파일을 실행하지 않습니다.");
		}
	}

}

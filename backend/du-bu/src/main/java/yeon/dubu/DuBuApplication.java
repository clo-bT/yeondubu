package yeon.dubu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import yeon.dubu.policy.service.PolicyService;
import yeon.dubu.stuff.service.StuffService;

@SpringBootApplication
public class DuBuApplication implements CommandLineRunner {

	private final PolicyService policyService;
	private final StuffService stuffService;
	private final ResourceLoader resourceLoader;

	@Autowired
	public DuBuApplication(PolicyService policyService, StuffService stuffService, ResourceLoader resourceLoader) {
		this.policyService = policyService;
		this.stuffService = stuffService;
		this.resourceLoader = resourceLoader;
	}
	public static void main(String[] args) {
		SpringApplication.run(DuBuApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String policyFilePath = "policy.json";
		String stuffFilePath = "stuff.json";

		boolean isPolicyDbEmpty = policyService.isPolicyDbEmpty();
		boolean isStuffDbEmpty = stuffService.isStuffDbEmpty();

		// 이전에 저장된 파일의 수정 시간 가져오기
		Resource policyResource = resourceLoader.getResource("classpath:" + policyFilePath);
		long previousPolicyModifiedTime = policyResource.lastModified();
		Resource stuffResource = resourceLoader.getResource("classpath:" + stuffFilePath);
		long previousStuffModifiedTime = stuffResource.lastModified();

		// 5초 대기
		Thread.sleep(5000);


		// 수정된 시간과 이전에 저장된 시간 비교하여 업데이트 여부 확인
		long currentPolicyModifiedTime = policyResource.lastModified();
		long currentStuffModifiedTime = stuffResource.lastModified();

		if (currentPolicyModifiedTime > previousPolicyModifiedTime || isPolicyDbEmpty) {
			policyService.deleteAllPolicies(); // 이전 데이터 삭제
			policyService.savePoliciesFromJsonFile("classpath:" + policyFilePath);
			System.out.println("정책 파일이 업데이트 되었습니다.");
		} else {
			System.out.println("파일이 업데이트되지 않았으므로 정책 파일을 실행하지 않습니다.");
		}

		if (currentStuffModifiedTime > previousStuffModifiedTime || isStuffDbEmpty) {
			stuffService.deleteAllStuffs(); // 이전 데이터 삭제
			stuffService.saveStuffsFromJsonFile("classpath:" + stuffFilePath);
			System.out.println("혼수 추천 파일이 업데이트 되었습니다.");
		} else {
			System.out.println("파일이 업데이트되지 않았으므로 혼수 추천 파일을 실행하지 않습니다.");
		}
	}

}

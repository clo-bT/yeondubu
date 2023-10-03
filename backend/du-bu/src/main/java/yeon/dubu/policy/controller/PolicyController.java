package yeon.dubu.policy.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.policy.dto.response.PolicyResDto;
import yeon.dubu.policy.service.PolicyService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/policy")
public class PolicyController {
    private final PolicyService policyService;

    @GetMapping("/{tagName}")
    public ResponseEntity<?> searchPolicies(
            @AuthenticationPrincipal Long userId,
            @PathVariable String tagName
    ) {
        List<PolicyResDto> policyResDtos = policyService.searchByTag(tagName, userId);

        return ResponseEntity.ok(policyResDtos);
    }
}

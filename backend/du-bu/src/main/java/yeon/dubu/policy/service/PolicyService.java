package yeon.dubu.policy.service;

import yeon.dubu.policy.dto.response.PolicyResDto;

import java.util.List;

public interface PolicyService {
    void savePoliciesFromJsonFile(String filePath);
    List<PolicyResDto> searchByTag(String tagName, Long userId);
    void deleteAllPolicies();
    boolean isDbEmpty();
}


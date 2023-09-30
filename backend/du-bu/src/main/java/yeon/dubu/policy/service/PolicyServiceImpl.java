package yeon.dubu.policy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.policy.domain.Policy;
import yeon.dubu.policy.repository.PolicyRepository;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PolicyServiceImpl implements PolicyService{

    private final PolicyRepository policyRepository;


    @Override
    @Transactional
    public void savePoliciesFromJsonFile(String filePath) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            File file = new File(filePath);
            JsonNode rootNode = objectMapper.readTree(file);

            Iterator<Map.Entry<String, JsonNode>> fieldsIterator = rootNode.fields();
            while (fieldsIterator.hasNext()) {
                Map.Entry<String, JsonNode> entry = fieldsIterator.next();
                JsonNode jsonNode = entry.getValue();

                Policy policy = new Policy();
                policy.setPolicy(jsonNode.get("policy").asText());
                policy.setShortSummary(jsonNode.get("short_summary").asText());
                policy.setTag(jsonNode.get("tag").asText());
                policy.setSubTag(jsonNode.get("sub_tag").asText());
                policy.setUrl(jsonNode.get("url").asText());

                policyRepository.save(policy);
            }

        } catch (IOException e) {
            // IOException 처리
            e.printStackTrace();
        }

    }
}

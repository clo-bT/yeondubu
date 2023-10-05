package yeon.dubu.stuff.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.stuff.domain.Stuff;
import yeon.dubu.stuff.repository.StuffRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StuffServiceImpl implements StuffService {

    private final StuffRepository stuffRepository;
    private final ResourceLoader resourceLoader;


    @Override
    @Transactional
    public void saveStuffsFromJsonFile(String filePath) {
        try {
            InputStream is = new ClassPathResource(filePath).getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();

            List<Stuff> stuffList = objectMapper.readValue(is, new TypeReference<List<Stuff>>() {});

            stuffRepository.saveAll(stuffList);

        } catch (IOException e) {
            e.printStackTrace();
            // 예외 처리 로직 추가
        }
    }

    @Override
    @Transactional
    public void deleteAllStuffs() {
        stuffRepository.deleteAll();
    }

    @Override
    public boolean isStuffDbEmpty() {
        return stuffRepository.count() == 0;
    }
}

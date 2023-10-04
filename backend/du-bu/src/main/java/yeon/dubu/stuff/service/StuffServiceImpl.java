package yeon.dubu.stuff.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.stuff.domain.Stuff;
import yeon.dubu.stuff.repository.StuffRepository;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StuffServiceImpl implements StuffService {

    private final StuffRepository stuffRepository;

    @Override
    @Transactional
    public void saveStuffsFromJsonFile(String filePath) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Stuff> stuffList = objectMapper.readValue(new File(filePath), new TypeReference<List<Stuff>>() {});

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

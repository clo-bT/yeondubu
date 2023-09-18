package yeon.dubu.category.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.category.dto.request.TagExpenditureReqDto;
import yeon.dubu.category.repository.TagExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class TagExpenditureServiceImpl implements TagExpenditureService{

    private final UserRepository userRepository;
    private final TagExpenditureRepository tagExpenditureRepository;

    @Override
    @Transactional
    public TagExpenditure insert(TagExpenditureReqDto tagExpenditureReqDto, Long userId) {

        // userId로 couple Id 조회
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));


        return null;
    }
}

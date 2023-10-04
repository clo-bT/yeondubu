package yeon.dubu.stuff.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.stuff.domain.Stuff;
import yeon.dubu.stuff.domain.StuffLikes;
import yeon.dubu.stuff.dto.request.StuffLikesReqDto;
import yeon.dubu.stuff.exception.NoSuchStuffException;
import yeon.dubu.stuff.repository.StuffLikesRepository;
import yeon.dubu.stuff.repository.StuffRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StuffLikesServiceImpl implements StuffLikesService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final StuffRepository stuffRepository;
    private final StuffLikesRepository stuffLikesRepository;

    /**
     * 좋아요 누르기
     * @param category
     * @param subCategory
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public void createStuffLikes(String category, String subCategory, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        Stuff stuff = stuffRepository.findByCategoryAndSubCategory(category, subCategory).orElseThrow(() -> new NoSuchStuffException("해당하는 혼수 추천 카테고리가 없습니다."));

        StuffLikes stuffLikes = StuffLikes.builder()
                .couple(couple)
                .stuff(stuff)
                .build();

        stuffLikesRepository.save(stuffLikes);

    }

}

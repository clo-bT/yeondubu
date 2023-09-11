package yeon.dubu.loan.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Loan extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dclsMonth; // 상품공시월
    private String finCompany; // 금융회사명
    private String joinWay; // 가입방법
    private String loanType; // 대출종류명
    private String rateName; // 금리명
    private Long rateBottom; // 최저금리

}

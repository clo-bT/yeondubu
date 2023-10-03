package yeon.dubu.common.schedule;
import org.springframework.scheduling.annotation.Scheduled;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import yeon.dubu.common.calculate.*;

import java.time.LocalDate;

@Slf4j
@Component
@RequiredArgsConstructor

public class ScheduledTasks {
    private final IncomeFromAccounts incomeFromAccounts;
    @Scheduled(cron = "0 0 0 * * * ") // Runs everyday
    public void runEveryDay(){
        LocalDate today = LocalDate.now();
        incomeFromAccounts.addIncomeToMoney(today);
        incomeFromAccounts.addAccountToMoney(today);
    }


}

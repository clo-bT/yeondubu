package yeon.dubu.stuff.service;


public interface StuffService {
    void saveStuffsFromJsonFile(String filePath);
    void deleteAllStuffs();
    boolean isStuffDbEmpty();
}

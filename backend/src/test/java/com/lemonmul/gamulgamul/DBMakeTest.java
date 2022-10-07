package com.lemonmul.gamulgamul;

import com.lemonmul.gamulgamul.entity.*;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.*;
import com.lemonmul.gamulgamul.service.AddNewDataService;
import com.lemonmul.gamulgamul.service.PriceGapService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@Transactional
@Rollback(value = false)
class DBMakeTest {

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    ProductRepo productRepo;

    @Autowired
    GoodsRepo goodsRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    FavoriteGoodsRepo favoriteGoodsRepo;

    @Autowired
    GoodsPriceRepo goodsPriceRepo;

    @Autowired
    PriceGapService priceGapService;

    @Autowired
    AddNewDataService addNewDataService;

    @Autowired
    EntityManager em;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    public void initDB() {
//        createCategoryTable();
//        createProductTable();
//        createProductPriceTable();
//        createGoodsTable();
//        createGoodsPriceTable();
//        createPriceIndexTable();
//
//        createUserTable();
//        createFavoriteGoodsTable();
//        createFavoriteTotalPriceTable();

//        addNewDataService.addNewDataAM();
//        addNewDataService.addNewDataPM();
//        addNewDataService.updateRecentPrice();
        addNewDataService.updatePriceGap();
    }

    private void createCategoryTable() {
        Category category;

        for(long i = 1L; i <= 12; i++) {
            category = Category.of(i, "category" + i, "temp img");
            em.persist(category);
        }
    }

    private void createProductTable() {
        Product product;
        long productId;

        for(long i = 1L; i <= 12; i++) {
            for(long j = 1L; j <= 10; j++) {
                productId = (i - 1L) * 10 + j;

                if(productId % 2 == 0)
                    product = Product.of(productId, categoryRepo.findById(i).get(), "product" + productId, 10, "g", 0.1 * productId, "temp img");
                else
                    product = Product.of(productId, categoryRepo.findById(i).get(), "product" + productId, 100, "ml", 0.1 * productId, "temp img");

                em.persist(product);
            }
        }
    }

    private void createProductPriceTable() {
        ProductPrice productPrice = null;
        Product product = null;
        LocalDate start = null;

        for(long i = 1L; i <= 120; i++) {
            product = productRepo.findById(i).get();

            start = LocalDate.of(2012, 9, 1);
            for(int j = 0; j <= 120; j++) {
//                productPrice = MonthProductPrice.createMonthProductPrice(i * 100.0 + j * 10.0, start.plusMonths(j), product);

                em.persist(productPrice);
            }

            start = LocalDate.of(2021, 9, 15);
            for(BusinessType businessType: BusinessType.values()) {
                for(int j = 0; j < 53; j++) {
//                    productPrice = WeekProductPrice.createWeekProductPrice(i * 100.0 + j * 20.0, start.plusWeeks(j), product, businessType);

                    em.persist(productPrice);
                }
            }
        }
    }

//    private void createGoodsTable() {
//        Goods goods = null;
//        Product product = null;
//        Long goodsId = 0L;
//
//        for(Long i = 1L; i <= 120; i++) {
//            product = productRepo.findById(i).get();
//            for(Long j = 1L; j <= 5; j++) {
//                goodsId = (i - 1L) * 5 + j;
//
//                goods = Goods.of(goodsId, "goods" + goodsId, "temp img", (int)(j * 100), product.getMeasure(), (int)(i / 12 + j), "temp url", product);
//
//                em.persist(goods);
//            }
//        }
//    }

//    private void createGoodsPriceTable() {
//        GoodsPrice goodsPrice = null;
//        Goods goods = null;
//        LocalDate start = null;
//
//        for(Long i = 1L; i <= 600; i++) {
//            goods = goodsRepo.findById(i).get();
//
//            start = LocalDate.of(2021, 9, 15);
//            for(BusinessType businessType: BusinessType.values()) {
//                for(int j = 0; j < 53; j++) {
//                    goodsPrice = GoodsPrice.of(i * 100.0 + j * 20.0, start.plusWeeks(j), businessType, goods);
//
//                    em.persist(goodsPrice);
//                }
//            }
//        }
//    }

//    private void createPriceIndexTable() {
//        PriceIndex priceIndex = null;
//        LocalDate start = LocalDate.of(2012, 9, 1);
//
//        for(int i = 0; i < 120; i++) {
//            priceIndex = CountryIndex.of(start.plusMonths(i), i * 0.7);
//            em.persist(priceIndex);
//
//            priceIndex = GMGMIndex.of(start.plusMonths(i), i * 0.9);
//            em.persist(priceIndex);
//        }
//    }

//    private void createUserTable() {
//        User user = null;
//
//        LocalDate start = LocalDate.of(1990, 1, 1);
//
//        for(int i = 1; i < 10; i++) {
//            user = User.of("email" + i + "@xx.xx", bCryptPasswordEncoder.encode("1234"), "name" + i, Gender.m, start.plusYears(i), Role.u);
//
//            em.persist(user);
//        }
//    }

    private void createFavoriteGoodsTable() {
        List<User> users = userRepo.findAll();
        Goods goods;
        FavoriteGoods favoriteGoods;

        int dateGap;

        for(User user: users) {
            for(int i = 1; i < 13; i++) {
                goods = goodsRepo.findById((long)(Math.random() * 469)).get();
                dateGap = (int)(Math.random() * 7);
                favoriteGoods = FavoriteGoods.of(user, goods, dateGap);

                em.persist(favoriteGoods);
            }

            for(int i = 1; i < 2; i++) {
                goods = goodsRepo.findById((long)(Math.random() * 56) + 20000).get();
                dateGap = (int)(Math.random() * 7);
                favoriteGoods = FavoriteGoods.of(user, goods, dateGap);

                em.persist(favoriteGoods);
            }
        }
    }

//    private void createFavoriteTotalPriceTable() {
//        List<User> users = userRepo.findAll();
//        User user = users.get(0);
//
//        List<FavoriteGoods> favoriteGoodsList = favoriteGoodsRepo.findAllByUserId(1L);
//        List<Goods> goodsList = new ArrayList<>();
//        for(FavoriteGoods favoriteGoodsIter: favoriteGoodsList) {
//            goodsList.add(favoriteGoodsIter.getGoods());
//        }
//
//        List<GoodsPrice> goodsPriceList;
//        for(BusinessType businessType: BusinessType.values()) {
//
//            goodsPriceList = goodsPriceRepo.findAllByBusinessAndGoodsIn(businessType, goodsList);
//
//            Map<LocalDate, Double> dateTotalPrices = new HashMap<>();
//            Double cur;
//            for(GoodsPrice goodsPrice: goodsPriceList) {
//                cur = 0.0;
//
//                if(dateTotalPrices.containsKey(goodsPrice.getResearchDate()))
//                    cur = dateTotalPrices.get(goodsPrice.getResearchDate());
//
//                dateTotalPrices.put(goodsPrice.getResearchDate(), cur + goodsPrice.getPrice());
//            }
//
//            FavoriteTotalPrice favoriteTotalPrice = null;
//            for(LocalDate key: dateTotalPrices.keySet()) {
//                favoriteTotalPrice = FavoriteTotalPrice.of(user, dateTotalPrices.get(key), key, businessType);
////                em.persist(favoriteTotalPrice);
//            }
//        }
//    }
}

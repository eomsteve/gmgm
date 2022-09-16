package com.lemonmul.gamulgamul;

import com.lemonmul.gamulgamul.entity.*;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.priceindex.CountryIndex;
import com.lemonmul.gamulgamul.entity.priceindex.GMGMIndex;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.product.MonthProductPrice;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.entity.product.WeekProductPrice;
import com.lemonmul.gamulgamul.entity.user.Gender;
import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    }

    private void createCategoryTable() {
        Category category = null;

        for(Long i = 1L; i <= 12; i++) {
            category = Category.createCategory(i, "category" + i, "temp img");
            em.persist(category);
        }
    }

    private void createProductTable() {
        Product product = null;
        Long productId = 0L;

        for(Long i = 1L; i <= 12; i++) {
            for(Long j = 1L; j <= 10; j++) {
                productId = (i - 1L) * 10 + j;

                if(productId % 2 == 0)
                    product = new Product(productId, categoryRepo.findById(i).get(), "product" + productId, 10, "g", 0.1 * productId, "temp img");
                else
                    product = new Product(productId, categoryRepo.findById(i).get(), "product" + productId, 100, "ml", 0.1 * productId, "temp img");

                em.persist(product);
            }
        }
    }

    private void createProductPriceTable() {
        ProductPrice productPrice = null;
        Product product = null;
        LocalDate start = null;

        for(Long i = 1L; i <= 120; i++) {
            product = productRepo.findById(i).get();

            start = LocalDate.of(2012, 9, 1);
            for(int j = 0; j <= 120; j++) {
                productPrice = MonthProductPrice.createMonthProductPrice(i * 100.0 + j * 10.0, start.plusMonths(j), product);

                em.persist(productPrice);
            }

            start = LocalDate.of(2021, 9, 15);
            for(BusinessType businessType: BusinessType.values()) {
                for(int j = 0; j < 53; j++) {
                    productPrice = WeekProductPrice.createWeekProductPrice(i * 100.0 + j * 20.0, start.plusWeeks(j), product, businessType);

                    em.persist(productPrice);
                }
            }
        }
    }

    private void createGoodsTable() {
        Goods goods = null;
        Product product = null;
        Long goodsId = 0L;

        for(Long i = 1L; i <= 120; i++) {
            product = productRepo.findById(i).get();
            for(Long j = 1L; j <= 5; j++) {
                goodsId = (i - 1L) * 5 + j;

                goods = Goods.createGoods(goodsId, "goods" + goodsId, "temp img", (int)(j * 100), product.getMeasure(), (int)(i / 12 + j), "temp url", product);

                em.persist(goods);
            }
        }
    }

    private void createGoodsPriceTable() {
        GoodsPrice goodsPrice = null;
        Goods goods = null;
        LocalDate start = null;

        for(Long i = 1L; i <= 600; i++) {
            goods = goodsRepo.findById(i).get();

            start = LocalDate.of(2021, 9, 15);
            for(BusinessType businessType: BusinessType.values()) {
                for(int j = 0; j < 53; j++) {
                    goodsPrice = GoodsPrice.createGoodsPrice(i * 100.0 + j * 20.0, start.plusWeeks(j), businessType, goods);

                    em.persist(goodsPrice);
                }
            }
        }
    }

    private void createPriceIndexTable() {
        PriceIndex priceIndex = null;
        LocalDate start = LocalDate.of(2012, 9, 1);

        for(int i = 0; i < 120; i++) {
            priceIndex = CountryIndex.createCountryIndex(start.plusMonths(i), i * 0.7);
            em.persist(priceIndex);

            priceIndex = GMGMIndex.createGMGMIndex(start.plusMonths(i), i * 0.9);
            em.persist(priceIndex);
        }
    }

    private void createUserTable() {
        User user = null;

        LocalDate start = LocalDate.of(1990, 1, 1);

        for(int i = 1; i < 10; i++) {
            user = User.createUser("email" + i + "@xx.xx", bCryptPasswordEncoder.encode("1234"), "name" + i, Gender.m, start.plusYears(i), Role.u);

            em.persist(user);
        }
    }

    private void createFavoriteGoodsTable() {
        List<User> users = userRepo.findAll();
        User user = users.get(0);
        Goods goods = null;
        FavoriteGoods favoriteGoods = null;

        for(Long i = 1L; i < 10; i++) {
            goods = goodsRepo.findById(i * 10).get();
            favoriteGoods = FavoriteGoods.createFavoriteGoods(user, goods);

            em.persist(favoriteGoods);
        }
    }

    private void createFavoriteTotalPriceTable() {
        List<User> users = userRepo.findAll();
        User user = users.get(0);

        List<FavoriteGoods> favoriteGoodsList = favoriteGoodsRepo.findAllByUserId(1L);
        List<Goods> goodsList = new ArrayList<>();
        for(FavoriteGoods favoriteGoodsIter: favoriteGoodsList) {
            goodsList.add(favoriteGoodsIter.getGoods());
        }

        List<GoodsPrice> goodsPriceList;
        for(BusinessType businessType: BusinessType.values()) {

            goodsPriceList = goodsPriceRepo.findAllByBusinessTypeAndGoodsIn(businessType, goodsList);

            Map<LocalDate, Double> dateTotalPrices = new HashMap<>();
            Double cur;
            for(GoodsPrice goodsPrice: goodsPriceList) {
                cur = 0.0;

                if(dateTotalPrices.containsKey(goodsPrice.getResearchDate()))
                    cur = dateTotalPrices.get(goodsPrice.getResearchDate());

                dateTotalPrices.put(goodsPrice.getResearchDate(), cur + goodsPrice.getPrice());
            }

            FavoriteTotalPrice favoriteTotalPrice = null;
            for(LocalDate key: dateTotalPrices.keySet()) {
                favoriteTotalPrice = FavoriteTotalPrice.createFavoriteTotalPrice(user, dateTotalPrices.get(key), key, businessType);
//                em.persist(favoriteTotalPrice);
            }
        }
    }
}

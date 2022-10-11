import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LayoutClient from './comps/general_comps/layoutClient';
import LayoutAdmin from './comps_admin/general_admin/layoutAdmin';
import LoginAdmin from './comps_admin/general_admin/loginAdmin';
import LogoutAdmin from './comps_admin/general_admin/logoutAdmin';
import SignUpClient from './comps/users_comps/signupClient';
import LogInClient from './comps/users_comps/loginClient';
import LogoutClient from './comps/users_comps/logoutClient';
import Page404 from './comps/general_comps/page404';
import 'react-toastify/dist/ReactToastify.css';
import SearchSaleCars from './comps/general_comps/searchSaleCars';
import SearchRentalCars from './comps/general_comps/searchRentalCars';
import CheckoutSale from './comps/orders_comps/checkoutSale';
import CheckoutRental from './comps/orders_comps/checkoutRental';
import Contact from './comps/general_comps/contact';
import SaleAdminList from './comps_admin/sale_admin/saleAdminList';
import RecentRental from './comps/rental_comps/recentRental';
import RentalCat from './comps/rental_comps/rentalCat';
import RentalListPage from './comps/rental_comps/rentalsListPage';
import RentalCarInfo from './comps/rental_comps/rentalCarInfo';
import SaleCarInfo from './comps/sale_comps/saleCarInfo';
import Home from './comps/general_comps/home';
import RentalAdminCatList from './comps_admin/rental_admin/rentalAdminCatList';
import EditCategoryRental from './comps_admin/rental_admin/editCategoryRental';
import AddRentalCategory from './comps_admin/rental_admin/addRentalCategory';
import RentalAdminList from './comps_admin/rental_admin/rentalAdminList';
import AddRentalProduct from './comps_admin/rental_admin/addRentalProduct';
import EditProductRental from './comps_admin/rental_admin/editProductRental';
import SaleAdminCatList from './comps_admin/sale_admin/saleAdminCatList';
import EditCategorySale from './comps_admin/sale_admin/editCategorySale';
import AddCategory from './comps_admin/sale_admin/addCategory';
import AddSaleProduct from './comps_admin/sale_admin/addSaleProduct';
import EditProductSale from './comps_admin/sale_admin/editProductSale';
import UsersList from './comps_admin/general_admin/usersList';
import CooperativeList from './comps_admin/general_admin/cooperativeList';
import CheckoutMain from './comps_admin/checkout_admin/checkoutMain';
import CheckoutAdminRental from './comps_admin/checkout_admin/checkoutAdminRental';
import CheckoutAdminSale from './comps_admin/checkout_admin/checkoutAdminSale';
import SaleList from './comps/sale_comps/saleList';
import Cooperative from './comps/cooperative/cooperative';
import CooperativeItem from './comps/cooperative/cooperativeItem';
import UserInfo from './comps/users_comps/userInfo';
import AddCooperCar from './comps/cooperative/addCooperCar';
import MyCooperList from './comps/cooperative/myCooperList';
import EditCooperCar from './comps/cooperative/editCooperCar';
import CheckoutPremium from './comps/orders_comps/checkoutPremium';

function AppRoute(props){
  return(
    <Router>
      <Routes>
        {/* for admin user */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<LoginAdmin />}/>
          <Route path="/admin/users" element={<UsersList />}/>
          <Route path="/admin/cooperative" element={<CooperativeList />}/>
          <Route path="/admin/logout" element={<LogoutAdmin />}/>
          {/* rental script admin*/}
          <Route path="/admin/rentalCars" element={<RentalAdminCatList/>}/>
          <Route path="/admin/rentalCars/edit/:url_name" element={<EditCategoryRental/>}/>
          <Route path="/admin/addRentalcategory" element={<AddRentalCategory />}/>
          <Route path="/admin/rentalCars/:cat_url" element={<RentalAdminList/>}/>
          <Route path="/admin/addRentalProduct" element={<AddRentalProduct />}/>
          <Route path="/admin/editProductRental/:id" element={<EditProductRental />}/>
          {/* sale script admin*/}
          <Route path="/admin/saleCars" element={<SaleAdminCatList/>}/>
          <Route path="/admin/saleCars/edit/:url_name" element={<EditCategorySale/>}/>
          <Route path="/admin/addcategory" element={<AddCategory />}/>
          <Route path="/admin/saleCars/:cat_url" element={<SaleAdminList/>}/>
          <Route path="/admin/addSaleProduct" element={<AddSaleProduct/>}/>
          <Route path="/admin/editProductSale/:id" element={<EditProductSale/>}/>
          {/* checkout admin*/}
          <Route path="/admin/checkout" element={<CheckoutMain />}/>
          <Route path="/admin/checkout/rental" element={<CheckoutAdminRental />}/>
          <Route path="/admin/checkout/sale" element={<CheckoutAdminSale />}/>
        </Route>
          {/* for regular user */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/login" element={<LogInClient />}  />
          <Route path="/signup" element={<SignUpClient />}  />
          <Route path="/logout" element={<LogoutClient />}  />
          <Route path="/userInfo" element={<UserInfo/>}  />
          {/* rental script */}
          <Route path="recentRental" element={<RecentRental />}/>
          <Route path="/rentalCat" element={<RentalCat />}  />
          <Route path="/rental/:cat_url" element={<RentalListPage/>}  />
          <Route path="/rentalSearch/" element={<SearchRentalCars />}  />
          <Route path="/rentalCarInfo/:id" element={<RentalCarInfo/>}  />
          {/* sale script */}
          <Route path="/sale" element={<SaleList/> }  />
          <Route path="/saleSearch/" element={<SearchSaleCars />}  />
          <Route path="/saleCarInfo/:id" element={<SaleCarInfo/>}  />
          {/* cooperatice script */}
          <Route path="/cooperative" element={<Cooperative />}  />          
          <Route path="/cooperative/addCar" element={<AddCooperCar/>}  />          
          <Route path="/cooperative/:id" element={<CooperativeItem />}  />          
          <Route path="/cooperative/myCooper" element={<MyCooperList />}  />          
          <Route path="/cooperative/editCar/:id" element={<EditCooperCar />}  />          
          {/* chechout */}
          <Route path="/checkoutSale/:id" element={<CheckoutSale />}  />
          <Route path="/checkoutRental/:id" element={<CheckoutRental />}  />
          <Route path="/checkoutPremium" element={<CheckoutPremium />}  />
          {/* error 404 */}
          <Route path="/*" element={<Page404/>} />
        </Route> 
      </Routes>
      <ToastContainer position="top-right" theme='colored' />
    </Router> 
  )
}

export default AppRoute
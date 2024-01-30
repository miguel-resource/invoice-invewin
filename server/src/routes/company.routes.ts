import koaBody from "koa-body";
import Router from "koa-router";
import CompanyController from "../controllers/company.controller";


const router = new Router();

const path = "/company";


router.post(path + "/auth", koaBody(), CompanyController.authCompany);
router.post(path + "/update", koaBody(), CompanyController.updateCompany);

export const companyRouter = router;
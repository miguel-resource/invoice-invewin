import koaBody from "koa-body";
import Router from "koa-router";
import CompanyController from "../controllers/company.controller";


const router = new Router();

const path = "/company";


router.post(path + "/auth", koaBody(), CompanyController.authCompany);

export const companyRouter = router;
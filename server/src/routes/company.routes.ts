import koaBody from "koa-body";
import Router from "koa-router";
import CompanyController from "../controllers/company.controller";

const router = new Router();

const path = "/company";

router.post(path, koaBody(), CompanyController.getCompanyEmisor);
router.post(path + "/auth", koaBody(), CompanyController.authCompany);
router.post(path + "/update", koaBody(), CompanyController.updateCompany);
router.post(path + "/invoices", koaBody(), CompanyController.getInvoices);

export const companyRouter = router;
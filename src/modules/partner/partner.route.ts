import express, { NextFunction, Request, Response } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { PartnerController } from "./partner.controller";

const router = express.Router();

router.get(
    "/",
     auth(USER_ROLE.ADMIN),
     PartnerController.getAllPartners
)

router.get(
    "/requested",
     auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
     PartnerController.getSinglePatnerRequest
)

router.post(
    "/requested",
    // auth(USER_ROLE.PARTNER),
    PartnerController.requestedPartner
)

router.patch(
    "/decisionmake",
    auth(USER_ROLE.ADMIN),
    PartnerController.decisionMakePartner
)


export const PartnerRoutes = router;
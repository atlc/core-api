import { Router } from 'express';
import { RequestUser } from '../../../../lib/types';
import { isSuperadmin, isUser } from '../../../utils/permissions';

const router = Router();

/*
interface ShoppingItem {
    id: string;
    user_id: string;
    name: string;
    avatar?: string;
    visible: number;
    created_at: string;
    updated_at: string;
};

interface ShoppingItemTag {
    shopping_item_id: string;
    shopping_tag_id: string;
    created_at: string;
    updated_at: string;
};

interface ShoppingTag {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

*/

router.get('/all', isSuperadmin, async (req, res) => {
    // let superadmin get all
});

router.get('/me', isUser, async (req: RequestUser, res) => {
    const id = req.user.id;
    // SELECT * FROM ShoppingLists where USERID = id
});

router.get('/:id', isUser, async (req: RequestUser, res) => {
    const id = req.user.id;
    // SELECT * FROM ShoppingLists where USERID = id
});

router.post('/', isUser, async (req: RequestUser, res) => {
    const id = req.user.id;
    // SELECT * FROM ShoppingLists where USERID = id
});

router.put('/:id', isUser, async (req: RequestUser, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    const details = req.body;
});

router.delete('/:id', isUser, async (req: RequestUser, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    // DELETE FROM ShoppingLists where id = id && userid = user_id
});

export default router;
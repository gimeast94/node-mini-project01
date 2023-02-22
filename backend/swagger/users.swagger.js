/**
 * @openapi
 * /users:
 *   get:
 *     tags: [users]
 *     summary: users 데이터 가져오는 api
 *     responses:
 *       200:
 *         description: success.
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: string
 */
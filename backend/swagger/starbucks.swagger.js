/**
 * @openapi
 * /starbucks:
 *   get:
 *     tags: [starbucks]
 *     summary: startbucks 음료 데이터 가져오는 api
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
/**
 * @openapi
 * /tokens/phone:
 *   post:
 *     tags: [tokens]
 *     summary: sms로 token 보내는 api
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone:
 *                              type: string
 *     responses:
 *       200:
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @openapi
 * paths: 
 *  /tokens/phone:
 *      patch:
 *          tags: [tokens]
 *          summary: 토큰인증 완료시 토큰값 변경하는 api
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              phone:
 *                                  type: string
 *                              token:
 *                                  type: string
 *          responses:
 *              '200': 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: boolean
 */


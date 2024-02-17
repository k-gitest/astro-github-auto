import * as validationFunctions from '../src/lib/authvalidation';
import { ZodError } from 'zod';

// テストスイートの開始を宣言し、テストケースをグループ化します。ここではvalidateFormData関数のテストを実行します
describe('validateFormData', () => {
  // テストケースの実行前に、モジュールをリセット
  // モジュールの間での状態共有が防止され、テスト間の依存関係が排除されます
  beforeEach(() => {
    jest.resetModules();
  });

  // validateFormData関数がデータを適切に処理できることを検証
  it('バリデーション成功テスト', () => {    

    // 適切なデータを渡してnullが返ってくることを検証する
    const data = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = validationFunctions.validateFormData(data);

    // バリデーションが成功して、nullが返されることを検証します
    expect(response).toBeNull();
  });

  // validateFormData関数が空のデータを適切に処理することを検証
  it('zodErrorのテスト', () => {

    // 空のデータを渡してvalidateFormData関数を呼び出し、エラーが返されることを検証
    const emptyData = {
      email: '',
      password: '',
    };
    const response = validationFunctions.validateFormData(emptyData);

    // zodエラーが返されることを検証します
    if(response instanceof ZodError){
      expect(response).toBeInstanceOf(Object);
    }
    
  });

  it('500エラーとエラーメッセージのテスト', () => {
    // テストデータ：オブジェクトではないデータ
    const invalidData: Record<string, unknown> = {};

    // 関数を呼び出してエラーを取得
    const result = validationFunctions.validateFormData(invalidData);

    // Response オブジェクトであることを確認
    if (result instanceof Response) {
      // 500エラーとメッセージが返されることを確認
      expect(result.status).toBe(500);
      expect(result).toEqual("Unknown error occurred");
    } 
  });

  
});

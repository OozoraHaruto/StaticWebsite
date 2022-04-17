var str = "あいうえお";
// 文字列を16bit数値の列に変換
var array = ECL.charset.Unicode.parse(str);   //=> [12354, 12356, 12358, 12360, 12362]
ECL.convert_array(array, "SJIS");    //=> [130, 160, 130, 162, 130, 164, 130, 166, 130, 168]
ECL.convert_array(array, "EUCJP");   //=> [164, 162, 164, 164, 164, 166, 164, 168, 164, 170]
// 配列からJS文字列(Unicode)に戻す場合は ECL.charset.Unicode.stringify( array )
ECL.charset.Unicode.stringify( array ); //=> "あいうえお"

// UTF-8文字列からSJIS文字列へ
var utf8str = unescape(encodeURIComponent("あいうえお"));
var sjisstr = ECL.convert(utf8str, 'SJIS', 'UTF8');
sjisstr == "\x82\xA0\x82\xA2\x82\xA4\x82\xA6\x82\xA8"; //=> true


/*
 例: ecl_array.js と CryptoJS を使いSJISテキストの暗号文・Base64・SHA1ハッシュを作る
    CryptoJS : https://code.google.com/p/crypto-js/
*/
var msg = "あいうえお";
var sjis = ECL.convert(msg, 'SJIS');
var sjis_wordarray = CryptoJS.enc.Latin1.parse( sjis ); // CryptoJSではWordArrayオブジェクトを作りデータをやりとりするのが楽
var encrypted = CryptoJS.AES.encrypt(sjis_wordarray, "Secret Passphrase"); //=> [object]
var base64 = sjis_wordarray.toString(CryptoJS.enc.Base64); //=> "gqCCooKkgqaCqA=="
var sha1 = CryptoJS.SHA1(sjis_wordarray).toString(CryptoJS.enc.Hex); //=> "2c332e42c55ba9293827672e85f16f1cda65518e"
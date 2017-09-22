using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace EncodeStr
{
    class Program
    {
        static void Main(string[] args)
        {
            String source = "2017/09/22 11:40:58|18671920627|o9vEe0cDAOrrsB6Im5bibKbBZP2A|0|1|1001";
            Console.WriteLine("C#加密");          
            String encryptData = AESHelper.Encrypt(source, "3454345434543454", "6666666666666666");
            Console.WriteLine(encryptData);
            Console.WriteLine("C#解密");
            String decryptData = AESHelper.Decrypt(encryptData, "3454345434543454", "6666666666666666");
            Console.WriteLine(decryptData);
            Console.WriteLine("JS加密字符串");
            Console.WriteLine("AFlgHtZkKTToC+yxw6a/8ONKZA4Tx734KAGnlZ+1K26hZr1XE2KlvUP7nY10bJFrUoJKUrf2dLPiK2kkW3OU3cQxfr1mQ7Q9GvBGwQIYfoc=");
            Console.ReadKey();
        }
       
    }
}

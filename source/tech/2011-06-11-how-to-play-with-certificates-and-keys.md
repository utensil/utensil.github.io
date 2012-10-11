---
title: 如何进行证书、私钥相关的各种操作
tags: 技巧
---

### 需求1：生成公私钥对和证书(pem格式或der格式)

生成公私钥对和证书请求

```
openssl req -newkey rsa:1024 -sha1 -pubkey -config myopenssl.cnf -keyout root.pri.key.pem -out root.cer.req.pem -days 3650  > root.pub.key.pem
```

根据公私钥对和证书请求生成pem格式的证书

```
openssl x509 -req -in root.cer.req.pem -sha1 -extfile myopenssl.cnf -extensions v3_ca -signkey root.pri.key.pem -out root.cer.pem -days 3650
```

以上得到的产物包括：

* 私钥文件：root.pri.key.pem
* 公钥文件：root.pub.key.pem
* pem格式证书：root.cer.pem

### 需求2：生成pfx(基于需求1)

将私钥和公钥合并

```
cat root.cer.pem root.pri.key.pem > root.pem
```

生成pfx

```
openssl pkcs12 -in root.pem -export -out root.pfx
```

### 需求3：从第三方vendor获得的证书导出公钥

从vendor获得vendor.cer.pem

从pem格式的证书中导出pem格式的公钥

```
openssl x509 -inform PEM -in vendor.cer.pem -outform PEM -pubkey -noout > vendor.pub.key.pem
```

### 需求4：用第三方vendor的证书生成jks

从vendor获得vendor.cer.pem

从pem证书生成jks

```
keytool -import -alias paygate_cert -keystore vendor.jks -storepass 111111 -trustcacerts -file vendor.cer.pem
```

下面这步可选复制粘贴 http://www.cfca.com.cn/cda-cgi/clientcgi?action=caCertPem 和 http://www.cfca.com.cn/cda-cgi/clientcgi?action=getCrossCerts 的内容至相应的pem。

然后，

```
keytool -import -alias cfca_rca -keystore vendor.jks -storepass 111111 -trustcacerts -file rca.pemkeytool -import -alias cfca_pca -keystore vendor.jks -storepass 111111 -trustcacerts -file pca.pemkeytool -import -alias cfca_oca -keystore vendor.jks -storepass 111111 -trustcacerts -file oca.pem
```

### 需求5：查看jks状态

```
keytool -list -keystore vendor.jks -storepass 111111
```

### 需求6：查看证书编号、有效期等详细信息

```
keytool -list -keystore vendor.jks -storepass 111111 -v -alias key_alias
```

### 需求7：证书格式转换

例：从PEM到DER

```
openssl x509 -inform PEM -in root.cer.pem -outform DER -pubkey -out root.cer.der
```

### 需求8：查看证书内部数据结构(ASN.1)

```
cat root.cer.pem|openssl asn1parse -inform PEM -icat root.cer.der|openssl asn1parse -inform DER -i
```

### 需求9：RSA私钥签名、公钥验签、公钥加密、私钥解密

RSA加解密相关的操作，使用`openssl rsautl`命令。

该命令的参数分为如下几个部分(我们不关心关于输入输出文件的参数，因为我们使用标准输入和输出)：

<table class="confluenceTable"><tbody>
<tr>
<th class="confluenceTh"> key文件 -inkey file </th>
<th class="confluenceTh"> key类型 [|-pubin|-certin] </th>
<th class="confluenceTh"> key格式 -keyform [PEM|DER] </th>
<th class="confluenceTh"> 操作 [-sign|-verify <br class="atl-forced-newline">|-encrypt|-decrypt] </th>
<th class="confluenceTh"> 填充格式 [-pkcs|-oaep <br class="atl-forced-newline">|-ssl|-raw] </th>
<th class="confluenceTh"> 输出格式 [|-hexdump|-asn1parse] </th>
</tr>
<tr>
<td class="confluenceTd"> 指定key的文件名 </td>
<td class="confluenceTd"> 默认: 私钥 </td>
<td class="confluenceTd"> PEM(默认): <br class="atl-forced-newline">即二进制格式经过base64之后 <br class="atl-forced-newline">加上形同----BEGIN PUBLIC KEY---- <br class="atl-forced-newline">的表征key类型的头和尾 </td>
<td class="confluenceTd"> -sign <br class="atl-forced-newline"><br class="atl-forced-newline">私钥签名 <br class="atl-forced-newline">(签名只能使用-pkcs <br class="atl-forced-newline">和-raw这两种填充) </td>
<td class="confluenceTd"> -pkcs(默认)： <br class="atl-forced-newline">PKCS#1 v1.5 填充 <br class="atl-forced-newline"><br class="atl-forced-newline">
</td>
<td class="confluenceTd"> -hexdump： <br class="atl-forced-newline">16进制输出 <br class="atl-forced-newline"><br class="atl-forced-newline">
</td>
</tr>
<tr>
<td class="confluenceTd"> 可为私钥、公钥或证书 </td>
<td class="confluenceTd"> -pubin: 公钥 </td>
<td class="confluenceTd"> DER: <br class="atl-forced-newline">即ASN.1二进制格式， <br class="atl-forced-newline">可用openssl asn1parse <br class="atl-forced-newline">理解其内部数据结构 </td>
<td class="confluenceTd"> -verify <br class="atl-forced-newline"><br class="atl-forced-newline">公钥验签 <br class="atl-forced-newline">(输出为被加签内容) </td>
<td class="confluenceTd"> -oaep： <br class="atl-forced-newline">PKCS#1 OAEP </td>
<td class="confluenceTd"> -ans1parse： <br class="atl-forced-newline">对于-verify的场合常用， <br class="atl-forced-newline">用于理解PKCS系列 <br class="atl-forced-newline">ASN.1格式的证书。 </td>
</tr>
<tr>
<td class="confluenceTd"> </td>
<td class="confluenceTd"> -certin: 证书 </td>
<td class="confluenceTd"> </td>
<td class="confluenceTd"> -encrypt <br class="atl-forced-newline"><br class="atl-forced-newline">公钥加密 </td>
<td class="confluenceTd"> -ssl： <br class="atl-forced-newline">  <br class="atl-forced-newline">SSL v2 中使用的 <br class="atl-forced-newline">向后兼容填充 </td>
<td class="confluenceTd"> </td>
</tr>
<tr>
<td class="confluenceTd"> </td>
<td class="confluenceTd"> </td>
<td class="confluenceTd"> </td>
<td class="confluenceTd"> -decrypt <br class="atl-forced-newline"><br class="atl-forced-newline">私钥解密 </td>
<td class="confluenceTd"> -raw： <br class="atl-forced-newline">  <br class="atl-forced-newline">不做任何填充 </td>
<td class="confluenceTd"> </td>
</tr>
</tbody></table>

其中`-sign`和`-verify`成对使用，`-encrypt`和`-decrypt`成对使用。

### 需求10：查看pfx的内部信息

```
openssl pkcs12 -info -in root.pfx 
```

输入密码之后，证书、私钥，均以PEM的格式打印出来，可以直接另存为对应的文件，相当于导出。

### 需求12：jks导出银行公钥

```
keytool -export -alias cfca_pca -keystore cebmerchant.jks  -file cfca_pca.cer  -storepass 111111
```

### 需求13：如何对base64、hex、decimal和binary之间进行转换

#### binary->base64

```
echo -n $binary|openssl base64
```

上面命令的缺点是，它会自动换行，可以手工拼接，也可以采用如下命令直接获得不自动换行的base64：

```
echo -n $binary|ruby -rbase64  -e '$stdin.binmode;$stdout.binmode;y = Base64.encode64($stdin.read); $stdout.write  y'
```

#### base64->binary

```
echo -n $base64|openssl base64 -d
```

上面命令的缺点是，它只接受有自动换行（每64个字符）的base64，可以手工换行，也可以采用如下命令直接解码：

```
echo -n $base64|ruby -rbase64  -e '$stdin.binmode;$stdout.binmode;y = Base64.decode64($stdin.read); $stdout.write  y'
```

#### binary->hex

```
echo -n $binary|xxd -p -c 256
```

#### hex->binary

```
echo -n $hex|xxd -p -r
```

#### decimal->hex

设decimal为10；

```
echo 'obase=16; 10'|bc
```

#### hex->decimal

设hex为 a；

```
echo 'ibase=16; A'|bc
```

注意要大写

#### 怎么做大小写转换？

```
tr '[:lower:]' '[:upper:]'
```

### 需求13：如何用命令行模拟ssl双向连接

若用`openssl s_client`

```
pstree -pa|grep -F "nc" -B 1|grep -F "12380" -B 1|grep -v grep|grep bash|awk -F"," '{print $2}'|xargs kill -9while true; do nc -l -p 12380 |openssl s_client -debug -msg -cert tc-cer.pem -key tc-pri.pem -quiet -connect 127.0.0.1:11443; done 
```

若用`wget`

```
wget --server-response   --timeout=10 --append-output=xxx.log --debug --header='Host: www.domain.com' --post-data='blah=blah' --post-file=FILE --no-check-certificate  --certificate=root.cer.pem --certificate-type=PEM --private-key=root.pri.pem --private-key-type=PEM https://127.0.0.1:443/
```

若用`curl`

```
curl --data "blah=blah"  --insecure --key root.pri.pem --key-type PEM --pass  PASS --cert root.cer.pem --cert-type PEM --max-time 10 --header "User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)" "http://domain/url"
```

参考文献
------------

* man
* [Useful OpenSSL Tricks](http://www.vanemery.com/Linux/Apache/openSSL.html)
* [ssl-converter](https://www.sslshopper.com/ssl-converter.html)
* [SSL双向认证Java实现 - CertPath证书链](http://firefly.javaeye.com/blog/674208)
* [Keytool to OpenSSL Conversion tips](http://conshell.net/wiki/index.php/Keytool_to_OpenSSL_Conversion_tips)
* [JavaSE Crypto Spec](http://java.sun.com/j2se/1.4.2/docs/guide/security/CryptoSpec.html#AppA)
* [配置 Tomcat 和 Wireshark 来获取并解码 SSL 通信](http://www.ibm.com/developerworks/cn/web/tutorials/wa-tomcat/section4.html)
* [http://wiki.wireshark.org/SSL](http://wiki.wireshark.org/SSL)
* [http://www.ibm.com/developerworks/cn/web/tutorials/wa-tomcat/section4.html](http://www.ibm.com/developerworks/cn/web/tutorials/wa-tomcat/section4.html)
        
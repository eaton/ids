export function numToBytes(input: number | BigInt) {
  const bytes = new Uint8Array();
  const num = Number(input);

  for (var index = 0; index < bytes.length; index ++ ) {
      var byte = num & 0xff;
      bytes[index] = byte;
      input = (num - byte) / 256 ;
  }
  return bytes;
}

export function bufToBigint(buf: ArrayBuffer | Uint8Array | Buffer): BigInt {
  let bits = 8n
  if (ArrayBuffer.isView(buf)) bits = BigInt(buf.BYTES_PER_ELEMENT * 8)
  else buf = new Uint8Array(buf)

  let ret = 0n
  for (const i of (buf as Uint8Array | Buffer).values()) {
    const bi = BigInt(i)
    ret = (ret << bits) + bi
  }
  return ret
}

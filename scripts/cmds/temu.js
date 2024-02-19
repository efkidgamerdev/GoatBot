module.exports = {
    config: {
        name: "temu",
        version: "1.0",
        author: "Jay Senpai",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        const lowerCaseBody = event.body.toLowerCase();
        if (lowerCaseBody.includes("temu") || lowerCaseBody.includes("ano temu") || lowerCaseBody.includes("ano temu dito")) {
            return message.reply(`TEMU LIST (jan 6,2023) 

(GCN-INITIALS-FBNAME)

• ANDROID/IOS • 

- 09771309033 D.K.R (Dan)
- 09859099348 R.R (Absynth)
- 09621320387 M.B (riona) x2
- 09195377408 R.Q (rico) 
- 09557764384 S.A (ellie)
- 09216318891 D.C (lawrence)
- 09504193085 M.M (glnna)
- 09947447391 A.L (luna)
- 09363504036 M.F (auie) 
- 09515848795 M.M.S (trisha) 
- 09165235306 L.M (saddie)
- 09262373689 N L.(Megumi) 
- 09519348027 J S.(spaghetti name)(×3)
- 09100097251 MVW A. (kaori) x2
-09121077933 M.B (ava)
- 09631955622 L.S (dennis)
- 09385667031 A.S (levana) 
- 09929217956 F.D.C (kiara)
- 09513538850 M.R (seia) 
- 09811920283 K.R.G (aeseuco) 
- 639128123667 M.J.B (axchie)
- 09633357213 M.V(adrana)
- 09108503752 C.A (alidon)
- 09486686222 B.A (max)
-09489339370 R.P(yela)

• SHEIN LIST •

-09621320387 M.B (riona)
- 09264812097J.S (yosimi)
- 09383149656 R.L (kaizen) 2x
 - 09674702618 D.A (kalma)
- 09816249248 G.E (maria)
- 09125379041 D.J (erin)
- 09265492336 R.A.M. (xylia) 
- 09677181916 J.D.C (yriez)
- 09972485324 M.A (jordi) 
-09093179171 B.A (hlex)



OFFICIAL LIST (edited)`);
        }
    }
};
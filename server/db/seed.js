const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.user.deleteMany();
    console.log("Existing users deleted");

    // Seeding users
    const users = await prisma.user.createMany({
      data: [
        { username: "dre", password: "andre123", isAdmin: true },
        { username: "Jameie", password: "james123", isAdmin: true },
        { username: "Aaron", password: "example123", isAdmin: false },
        { username: "Charles_New", password: "example123", isAdmin: false },
        { username: "Rich_New", password: "example123", isAdmin: true },
      ],
    });
    console.log("Users seeded: 5", users);

    // Seeding orders
    await prisma.order.createMany({
      data: [
        { userId: 1, totalPrice: 50.25, isInCart: false, status: "PENDING" },
        { userId: 2, totalPrice: 82.99, isInCart: false, status: "PENDING" },
        { userId: 3, totalPrice: 46.99, isInCart: false, status: "PENDING" },
        { userId: 4, totalPrice: 32.99, isInCart: false, status: "PENDING" },
        { userId: 5, totalPrice: 16.99, isInCart: false, status: "PENDING" },
      ],
    });
    console.log("Orders seeded.");

    await prisma.book.createMany({
      data: [
        {
          title: "My Name is Barbra",
          price: 19.99,
          description:
            "Fans of Streisand will find this difficult to put down, though at 900 plus pages they will frequently have to. Yet with the life she’s led, it’s hard to imagine the book being any shorter. In many ways, Streisand’s life is a fairy tale. A homely child, she lost her father at 15 months and was raised by a cold mother and a cruel stepfather. Dreaming of stardom, Barbra fled to Manhattan as a teenager. She was a sought-after singer by age 19 and a Broadway star by 22. Then a movie star. Then a director. She kissed many (famous) frogs until finding true love with actor James Brolin in her fifties. But Streisand’s story is also reflective of the difficulties facing many women, especially the societal distrust of those who want to claim their power. Streisand presents herself honestly here. She’s a perfectionist, sometimes humorless and often relentless, particularly when it comes to fulfilling her artistic vision. Yet members of her entourage have been with her for 40, 50, 60 years, and old loves and former collaborators remember her with affection and admiration. (She provides quotes). Peppered with boldface names and filled with too many musical and cinematic memories to count, this memoir is as extraordinary as the woman who wrote it.",
          inStock: true,
          isPopular: false,
          imgUrl:
            "https://pub.booklistonline.com/Content/Images/userupload/d/d1/d16/d1643becc69d4636a00eb96fe7915ab2.jpg",
        },
        {
          title: "The Hunger Games",
          price: 34.99,
          description:
            "In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.        Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg",
        },
        {
          title: "Harry Potter and the Order of the Phoenix",
          price: 24.99,
          description:
            "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him.        Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
        },
        {
          title: "Pride and Prejudice",
          price: 15.99,
          description:
            "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work her own darling child and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.' The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen's radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
        },
        {
          title: "One Piece",
          price: 14.99,
          description:
            "Gol D. Roger, a man referred to as the 'King of the Pirates,' is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the King of the Pirates is executed and the Great Age of Pirates begins. Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new King of the Pirates. Armed with just a straw hat, a small boat, and an elastic body, he sets out on a fantastic journey to gather his own crew and a worthy ship that will take them across the Grand Line to claim the greatest status on the high seas.",
          inStock: true,
          isPopular: false,
          imgUrl: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
        },
        {
          title: "To Kill a Mockingbird",
          price: 54.99,
          description:
            "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Compassionate, dramatic, and deeply moving, 'To Kill A Mockingbird' takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
        },
        {
          title: "Berserk",
          price: 25.99,
          description:
            "Guts, a former mercenary now known as the 'Black Swordsman,' is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings. Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity.",
          inStock: true,
          isPopular: true,
          imgUrl: "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
        },
        {
          title: "The Book Thief",
          price: 24.99,
          description:
            "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still. By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger's Handbook, left behind there by accident, and it is her first act of book thievery. So begins a love affair with books and words, as Liesel, with the help of her accordian-playing foster father, learns to read. Soon she is stealing books from Nazi book-burnings, the mayor's wife's library, wherever there are books to be found.But these are dangerous times. When Liesel's foster family hides a Jew in their basement, Liesel's world is both opened up, and closed down. In superbly crafted writing that burns with intensity, award-winning author Markus Zusak has given us one of the most enduring stories of our time.",
          inStock: true,
          isPopular: false,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg",
        },
        {
          title: "Twilight",
          price: 19.99,
          description:
            "About three things I was absolutely positive. First, Edward was a vampire. Second, there was a part of him - and I didn't know how dominant that part might be - that thirsted for my blood. And third, I was unconditionally and irrevocably in love with him.",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700522826i/41865.jpg",
        },
        {
          title: "Animal Farm",
          price: 10.99,
          description:
            "A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned –a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. When Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwell’s masterpiece have a meaning and message still ferociously fresh.",
          inStock: true,
          isPopular: false,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1325861570i/170448.jpg",
        },
        {
          title:
            "J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings",
          price: 64.99,
          description:
            "This four-volume, boxed set contains J.R.R. Tolkien's epic masterworks The Hobbit and the three volumes of The Lord of the Rings (The Fellowship of the Ring, The Two Towers, and The Return of the King). In The Hobbit, Bilbo Baggins is whisked away from his comfortable, unambitious life in Hobbiton by the wizard Gandalf and a company of dwarves. He finds himself caught up in a plot to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon. The Lord of the Rings tells of the great quest undertaken by Frodo Baggins and the Fellowship of the Ring: Gandalf the wizard; the hobbits Merry, Pippin, and Sam; Gimli the dwarf; Legolas the elf; Boromir of Gondor; and a tall, mysterious stranger called Strider. J.R.R. Tolkien's three volume masterpiece is at once a classic myth and a modern fairy tale—a story of high and heroic adventure set in the unforgettable landscape of Middle-earth",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30.jpg",
        },
        {
          title: "The Fault in Our Stars",
          price: 24.99,
          description:
            "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten. Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660273739i/11870085.jpg",
        },
        {
          title: "The Chronicles of Narnia",
          price: 44.99,
          description:
            "Journeys to the end of the world, fantastic creatures, and epic battles between good and evil—what more could any reader ask for in one book? The book that has it all is The Lion, the Witch and the Wardrobe, written in 1949 by Clive Staples Lewis. But Lewis did not stop there. Six more books followed, and together they became known as The Chronicles of Narnia.        For the past fifty years, The Chronicles of Narnia have transcended the fantasy genre to become part of the canon of classic literature. Each of the seven books is a masterpiece, drawing the reader into a land where magic meets reality, and the result is a fictional world whose scope has fascinated generations.This edition presents all seven books—unabridged—in one impressive volume. The books are presented here in chronlogical order, each chapter graced with an illustration by the original artist, Pauline Baynes. Deceptively simple and direct, The Chronicles of Narnia continue to captivate fans with adventures, characters, and truths that speak to readers of all ages, even fifty years after they were first published.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661032875i/11127.jpg",
        },
        {
          title: "The Picture of Dorian Gray",
          price: 17.99,
          description:
            "Oscar Wilde’s only novel is the dreamlike story of a young man who sells his soul for eternal youth and beauty. In this celebrated work Wilde forged a devastating portrait of the effects of evil and debauchery on a young aesthete in late-19th-century England. Combining elements of the Gothic horror novel and decadent French fiction, the book centers on a striking premise: As Dorian Gray sinks into a life of crime and gross sensuality, his body retains perfect youth and vigor while his recently painted portrait grows day by day into a hideous record of evil, which he must keep hidden from the world. For over a century, this mesmerizing tale of horror and suspense has enjoyed wide popularity. It ranks as one of Wilde's most important creations and among the classic achievements of its kind.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546103428i/5297.jpg",
        },
        {
          title: "The Giving Tree",
          price: 24.99,
          description:
            " 'Once there was a tree...and she loved a little boy.' So begins a story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein.Every day the boy would come to the tree to eat her apples, swing from her branches, or slide down her trunk...and the tree was happy. But as the boy grew older he began to want more from the tree, and the tree gave and gave and gave. This is a tender story, touched with sadness, aglow with consolation. Shel Silverstein has created a moving parable for readers of all ages that offers an affecting interpretation of the gift of giving and a serene acceptance of another's capacity to love in return.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1174210942i/370493.jpg",
        },
        {
          title: "Gone with the Wind",
          price: 17.99,
          description:
            "Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1551144577i/18405.jpg",
        },
        {
          title: "Wuthering Heights",
          price: 32.35,
          description:
            "At the centre of this novel is the passionate love between Catherine Earnshaw and Heathcliff - recounted with such emotional intensity that a plain tale of the Yorkshire moors acquires the depth and simplicity of ancient tragedy. This best-selling Norton Critical Edition is based on the 1847 first edition of the novel. For the Fourth Edition, the editor has collated the 1847 text with several modern editions and has corrected a number of variants, including accidentals. The text is accompanied by entirely new explanatory annotations.New to the fourth Edition are twelve of Emily Bronte's letters regarding the publication of the 1847 edition of Wuthering Heights as well as the evolution of the 1850 edition, prose and poetry selections by the author, four reviews of the novel, and poetry selections by the author, four reviews of the novel, and Edward Chitham's insightful and informative chronology of the creative process behind the beloved work. Five major critical interpretations of Wuthering Heights are included, three of them new to the Fourth Edition. A Stuart Daley considers the importance of chronology in the novel. J. Hillis Miller examines Wuthering Heights's problems of genre and critical reputation. Sandra M. Gilbert assesses the role of Victorian Christianity plays in the novel, while Martha Nussbaum traces the novel's romanticism. Finally, Lin Haire-Sargeant scrutinizes the role of Heathcliff in film adaptations of Wuthering Heights.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388212715i/6185.jpg",
        },
        {
          title: "The Perks of Being a Wallflower",
          price: 18.18,
          description:
            "standing on the fringes of life... offers a unique perspective. But there comes a time to see what it looks like from the dance floor. This haunting novel about the dilemma of passivity vs. passion marks the stunning debut of a provocative new voice in contemporary fiction: The Perks of Being A WALLFLOWER. This is the story of what it's like to grow up in high school. More intimate than a diary, Charlie's letters are singular and unique, hilarious and devastating. We may not know where he lives. We may not know to whom he is writing. All we know is the world he shares. Caught between trying to live his life and trying to run from it puts him on a strange course through uncharted territory. The world of first dates and mixed tapes, family dramas and new friends. The world of sex, drugs, and The Rocky Horror Picture Show, when all one requires is that the perfect song on that perfect drive to feel infinite.Through Charlie, Stephen Chbosky has created a deeply affecting coming-of-age story, a powerful novel that will spirit you back to those wild and poignant roller coaster days known as growing up.",
          inStock: true,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033115i/22628.jpg",
        },
        {
          title: "Harry Potter and the Sorcerer’s Stone",
          price: 54.65,
          description:
            " 'Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter 'H' '. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg",
        },
        {
          title: "Death Note",
          price: 54.65,
          description:
            " Shinigami own notebooks called “Death Notes” which are used as killing devices. Whoever’s name they write down in a death note will die within 40 seconds. Shinigami Ryuk dropped his Death Note in the human world where it’s found by honor high school student Light. With the death note actually having directions in it for its use, Light discovers he now has the power to discreetly kill people, and with this new power he plans to change the world in his ideal world by killing off criminals. Eventually the governments of the countries around the world notice the unusual amounts of deaths of their criminals, and figure out someone is behind them, but they have no way of discovering it themselves. That’s when they hire L, a master detective, to find out who is behind the murders.",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://cdn.animenewsnetwork.com/thumbnails/fit200x200/encyc/A4354-41.jpg",
        },
        {
          title: "Naruto",
          price: 54.65,
          description:
            " Twelve years ago, in a world populated by powerful ninja, a legendary beast known as the Nine-Tailed Fox attacked the village of Konohagakure, taking hundreds of lives. To save the city, the village's leader, the Fourth Hokage, sacrificed his life to seal the Fox into a newborn child. That child became Naruto Uzumaki, a hyperactive and optimistic but emotionally torn boy who has been abused and neglected by the very village that he lives in. Vowing to gain their respect, Naruto sets off on a journey to become the Hokage himself, and joins a ninja team alongside his new friends - the taciturn Sasuke, the kind-hearted Sakura, and the mysterious leader Kakashi. But things are not all that they seem, as Naruto will have to fight threats to the village, a group that wishes to exploit the Nine-Tails, and even his own teammates' wavering loyalties in an epic tale of war, growth, and love. When Naruto was born the spirit of a evil nine-tailed fox was imprisoned within him, rendering him the hate of the villagers in the ninja-village of the Leaf who feared the demon in him. Countering this hate he grew into the role of the clown, trying to attract attention by making a fool of himself and his teachers. But within him dwells the dream of becoming Hokage, the strongest warrior of the village. When he graduates from the academy he’s placed in the same group as Sakura, the technician and the girl he loves and Sasuke, the strong, quiet guy and his rival for Sakura. Leader and teacher of the group are Kakashi, the strange and always late, though powerful ninja.",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://cdn.animenewsnetwork.com/thumbnails/fit200x200/encyc/A1598-21.jpg",
        },
        {
          title: "Bleach",
          price: 54.65,
          description:
            " Bleach follows the adventures of Ichigo Kurosaki, a teenager with the ability to see spirits,who accidentally steals the powers of the Soul Reaper Rukia Kuchiki while saving his family and subsequently assumes her duties while she convalesces. Since that event, Ichigo has to fight hollows, evil spirits that attack people.In the process he makes new Friends with special abilities. After various events, Rukia is sentenced to death by her Soul Reapers' superiors for her actions, leading Ichigo to encounter them to save her life. He also encounters former Soul Reaper Sōsuke Aizen, who created an army of powerful hollow called arrancar to destroy the Soul Reapers organization, Soul Society. Ichigo Kurosaki has always been able to see ghosts, but this ability doesn't change his life nearly as much as his close encounter with Rukia Kuchiki, a Soul Reaper and member of the mysterious Soul Society. While fighting a Hollow, an evil spirit that preys on humans who display psychic energy, Rukia attempts to lend Ichigo some of her powers so that he can save his family; but much to her surprise, Ichigo absorbs every last drop of her energy. Now a full-fledged Soul Reaper himself, Ichigo quickly learns that the world he inhabits is one full of dangerous spirits and, along with Rukia--who is slowly regaining her powers--it's Ichigo's job to protect the innocent from Hollows and help the spirits themselves find peace.",
          inStock: false,
          isPopular: true,
          imgUrl:
            "https://cdn.animenewsnetwork.com/thumbnails/fit200x200/encyc/A2468-2556861782.1448945818.jpg",
        },
      ],
    });

    console.log("Books seeded: 22");


    // async function deleteSpecificOrders() {
    //   try {
    //     // Delete orders with totalPrice less than 50
    //     await prisma.order.deleteMany({
    //       where: {
    //         totalPrice: { lt: 90 },
    //       },
    //     });
    //     console.log(
    //       "Orders with totalPrice less than 50 deleted successfully."
    //     );
    //   } catch (error) {
    //     console.error("Error deleting orders:", error);
    //   }
    // }

    // deleteSpecificOrders();

    console.log("Seed complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

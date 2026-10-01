const candidatos = [
    {
        numero: "13",
        nome: "Luiz Inácio Lula da Silva",
        partido: "PT (Partido dos Trabalhadores)",
        avatarCor: "#d86b4f",
        foto: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Lula",
        bio: "Atual presidente do Brasil. Ex-líder sindical, governou o país de 2003 a 2010 e retornou ao cargo em 2023."
    },
    {
        numero: "22",
        nome: "Flávio Bolsonaro",
        partido: "PL (Partido Liberal)",
        avatarCor: "#5d8fc7",
        foto: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=FlavioBolsonaro",
        bio: "Senador pelo Rio de Janeiro e advogado."
    },
    {
        numero: "55",
        nome: "Ronaldo Caiado",
        partido: "PSD (Partido Social Democrático)",
        avatarCor: "#69a879",
        foto: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=RonaldoCaiado",
        bio: "Médico ortopedista, ex-deputado federal, ex-senador e governador de Goiás."
    },
    {
        numero: "30",
        nome: "Romeu Zema",
        partido: "NOVO",
        avatarCor: "#b278cf",
        foto: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=RomeuZema",
        bio: "Administrador de empresas, empresário e ex-governador de Minas Gerais."
    },
    {
        numero: "70",
        nome: "Augusto Cury",
        partido: "AVANTE",
        avatarCor: "#d5a14e",
        foto: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=AugustoCury",
        bio: "Médico psiquiatra, professor e autor de livros sobre inteligência emocional."
    },
    {
        numero: "14",
        nome: "Renan Santos",
        partido: "MISSÃO",
        avatarCor: "#c96c9b",
        foto: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=RenanSantos",
        bio: "Empresário, ativista político e um dos fundadores do Movimento Brasil Livre (MBL)."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista-candidatos");
    const btnExplorar = document.getElementById("btnExplorar");
    const candidatosSection = document.getElementById("candidatos");
    const musicaFundo = document.getElementById("musicaFundo");
    const btnMusica = document.getElementById("btnMusica");
    const btnFala = document.getElementById("btnFala");
    const btnPausar = document.getElementById("btnPausar");
    const statusMidia = document.getElementById("statusMidia");

    /*
     * Criação dos cards dos candidatos
     */
    if (lista) {
        lista.innerHTML = candidatos.map((candidato, index) => `
            <article class="card" data-expression="sorrindo">

                <div
                    class="avatar-wrap"
                    style="--avatar-accent: ${candidato.avatarCor}"
                    aria-label="Avatar ilustrado de ${candidato.nome}"
                >
                    <div class="avatar" aria-hidden="true">
                        <span class="avatar-cabelo"></span>
                        <span class="avatar-olho avatar-olho-esquerdo"></span>
                        <span class="avatar-olho avatar-olho-direito"></span>
                        <span class="avatar-boca"></span>
                    </div>

                    <span class="avatar-legenda">
                        AVATAR ILUSTRADO
                    </span>
                </div>

                <img
                    src="${candidato.foto}"
                    alt="Avatar ilustrado de ${candidato.nome}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/900x600/141b24/e3b341/png?text=Imagem+indisponivel'"
                >

                <div class="card-conteudo">

                    <span class="card-numero">
                        ${candidato.numero || String(index + 1).padStart(2, "0")}
                    </span>

                    <p class="partido">
                        ${candidato.partido}
                    </p>

                    <h3>
                        ${candidato.nome}
                    </h3>

                    <p>
                        ${candidato.bio}
                    </p>

                    <div
                        class="expressoes"
                        aria-label="Expressão do avatar"
                    >
                        <button
                            class="btn-expressao ativo"
                            type="button"
                            data-expression-button="sorrindo"
                        >
                            Sorrir
                        </button>

                        <button
                            class="btn-expressao"
                            type="button"
                            data-expression-button="serio"
                        >
                            Expressão séria
                        </button>
                    </div>

                </div>

            </article>
        `).join("");
    }

    /*
     * Botão "Explorar Projeto"
     */
    btnExplorar?.addEventListener("click", () => {
        candidatosSection?.scrollIntoView({
            behavior: "smooth"
        });
    });

    /*
     * Expressões dos avatares
     */
    document.querySelectorAll(".card").forEach(card => {
        card.querySelectorAll("[data-expression-button]").forEach(button => {

            button.addEventListener("click", () => {

                const expression = button.dataset.expressionButton;

                card.dataset.expression = expression;

                card.querySelectorAll("[data-expression-button]").forEach(item => {
                    item.classList.toggle(
                        "ativo",
                        item === button
                    );
                });

            });

        });
    });

    /*
     * Status da mídia
     */
    const atualizarStatus = texto => {
        if (statusMidia) {
            statusMidia.textContent = texto;
        }
    };

    /*
     * Música de fundo
     */
    btnMusica?.addEventListener("click", async () => {

        if (!musicaFundo) {
            atualizarStatus("Áudio de música não encontrado");
            return;
        }

        if (musicaFundo.paused) {

            try {

                await musicaFundo.play();

                btnMusica.textContent = "[⏸] Música de fundo";
                btnMusica.setAttribute("aria-pressed", "true");

                atualizarStatus("Música reproduzindo");

            } catch (error) {

                console.error("Erro ao reproduzir música:", error);

                atualizarStatus(
                    "Não foi possível carregar a música"
                );
            }

        } else {

            musicaFundo.pause();

            btnMusica.textContent = "[▶] Música de fundo";
            btnMusica.setAttribute("aria-pressed", "false");

            atualizarStatus("Música pausada");
        }

    });

    /*
     * Leitura em voz alta
     */
    btnFala?.addEventListener("click", () => {

        if (!("speechSynthesis" in window)) {

            atualizarStatus(
                "Leitura em voz alta não suportada neste navegador"
            );

            return;
        }

        if (speechSynthesis.speaking) {

            speechSynthesis.cancel();

            btnFala.textContent = "[🔊] Áudio/Fala";

            atualizarStatus(
                "Leitura interrompida"
            );

            return;
        }

        const texto = document.querySelector("main")?.innerText.trim();

        if (!texto) {
            atualizarStatus("Não há conteúdo para leitura");
            return;
        }

        const fala = new SpeechSynthesisUtterance(texto);

        fala.lang = "pt-BR";
        fala.rate = 0.95;

        fala.onstart = () => {

            btnFala.textContent = "[⏹] Parar fala";

            atualizarStatus(
                "Leitura em voz alta ativa"
            );
        };

        fala.onend = () => {

            btnFala.textContent = "[🔊] Áudio/Fala";

            atualizarStatus(
                "Leitura concluída"
            );
        };

        fala.onerror = () => {

            btnFala.textContent = "[🔊] Áudio/Fala";

            atualizarStatus(
                "Erro na leitura em voz alta"
            );
        };

        speechSynthesis.speak(fala);
    });

    /*
     * Pausar / continuar mídia
     */
    btnPausar?.addEventListener("click", () => {

        const falaAtiva =
            "speechSynthesis" in window &&
            speechSynthesis.speaking;

        const musicaAtiva =
            musicaFundo &&
            !musicaFundo.paused;

        const algoAtivo =
            musicaAtiva ||
            falaAtiva;

        if (algoAtivo) {

            if (musicaFundo && !musicaFundo.paused) {
                musicaFundo.pause();
            }

            if (
                "speechSynthesis" in window &&
                speechSynthesis.speaking
            ) {
                speechSynthesis.pause();
            }

            btnPausar.textContent = "[▶] Continuar";

            atualizarStatus(
                "Mídia pausada"
            );

        } else {

            if (musicaFundo) {
                musicaFundo.play().catch(error => {
                    console.warn(
                        "Não foi possível iniciar a música:",
                        error
                    );
                });
            }

            if (
                "speechSynthesis" in window &&
                speechSynthesis.paused
            ) {
                speechSynthesis.resume();
            }

            btnPausar.textContent = "[⏸] Pausar";

            atualizarStatus(
                "Mídia reproduzindo"
            );
        }

    });

    /*
     * Animação dos cards
     */
    document.querySelectorAll(".card").forEach((card, index) => {

        card.style.setProperty(
            "--delay",
            `${index * 120}ms`
        );

    });

    /*
     * Navegação
     */
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => {
                item.classList.remove("ativo");
            });

            link.classList.add("ativo");
        });

    });

});
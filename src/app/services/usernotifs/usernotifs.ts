export interface UserNotif {
/*     private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotBlank
    private String type;

    private Boolean expired; */

    id:Number;
    title:String;
    content:String;
    date:Date;
    type:String;
    expired:Boolean;
}
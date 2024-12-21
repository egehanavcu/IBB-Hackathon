package com.isthackathon.takimyildiz.business.constants;

import com.isthackathon.takimyildiz.entities.Shared;
import org.springframework.http.HttpStatus;

import java.util.List;

public class SharedMessages {
    public static String sharedAdded = "Başarıyla paylaşıldı.";
    public static String sharedNotFound = "Paylaşım bulunamadı.";
    public static String sharedListed = "Paylaşımlar listelendi.";
    public static String sharedAlreadyAccepted = "Paylaşım zaten kabul edilmiş.";
    public static String sharedCannotBeAcceptedByPublisher = "Paylaşım yayıncı tarafından kabul edilemez.";
    public static String sharedCannotBeAcceptedByAnotherUser = "Paylaşım başka bir kullanıcı tarafından kabul edilemez.";
    public static String sharedAccepted = "Paylaşım kabul edildi.";
    public static String shareTypeNotValid = "Paylaşım tipi geçerli değil.";
    public static String shareTypeCannotBeNull = "Paylaşım tipi boş olamaz.";
    public static String parentOfChildNotFound = "Çocuğun ebeveyni bulunamadı.";
    public static String parentOfChildFound = "Çocuğun ebeveyni bulundu.";
}
